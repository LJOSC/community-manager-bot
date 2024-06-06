import { NextFunction, Request, Response } from 'express';
import * as githubService from './github.service';

/**
 * @param {req} - request
 * @param {res} - response
 * @param {next} - next
 */
export const githubStarSlackNotify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const props = req.body;

    const result = await githubService.githubStarSlackNotify(props);

    res.status(result.code).json(result);
  } catch (error) {
    next(error);
  }
};
