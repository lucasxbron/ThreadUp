import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import AdminLog from "../models/adminLog.js";

export const getAdminLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only allow admins to view logs
    if (!req.user?.roles?.includes("ADMIN")) {
      throw createHttpError(403, "Admin access required");
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    const skip = (page - 1) * limit;

    // Optional filters
    const action = req.query.action as string;
    const adminId = req.query.adminId as string;
    const targetType = req.query.targetType as string;

    // Build filter object
    const filter: any = {};
    if (action) filter.action = action;
    if (adminId) filter.adminId = adminId;
    if (targetType) filter.targetType = targetType;

    const logs = await AdminLog.find(filter)
      .populate('adminId', 'firstName lastName username email')
      .populate('targetAuthorId', 'firstName lastName username email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalLogs = await AdminLog.countDocuments(filter);

    res.status(200).json({
      logs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalLogs / limit),
        totalLogs,
        hasNext: page < Math.ceil(totalLogs / limit),
        hasPrev: page > 1,
      },
      filters: {
        action,
        adminId,
        targetType
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Only allow admins to view stats
    if (!req.user?.roles?.includes("ADMIN")) {
      throw createHttpError(403, "Admin access required");
    }

    const totalLogs = await AdminLog.countDocuments();
    
    const actionStats = await AdminLog.aggregate([
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      }
    ]);

    const adminStats = await AdminLog.aggregate([
      {
        $group: {
          _id: '$adminId',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'admin'
        }
      },
      {
        $unwind: '$admin'
      },
      {
        $project: {
          count: 1,
          'admin.firstName': 1,
          'admin.lastName': 1,
          'admin.username': 1,
          'admin.email': 1
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentActivity = await AdminLog.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    res.status(200).json({
      totalLogs,
      actionStats,
      adminStats,
      recentActivity
    });
  } catch (error) {
    next(error);
  }
};