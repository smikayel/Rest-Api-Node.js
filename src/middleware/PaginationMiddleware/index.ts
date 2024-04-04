import { DEFAULT_PAGE_SIZE } from '@src/constants/constants';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '../AuthMiddleware';

export interface PaginationRequest extends AuthenticatedRequest {
	pageSize?: number,
	skip?: number
}

export const getPageAndSkipValues = (
	req: AuthenticatedRequest
) => {
	const pageNumber = Number(req.query.page) || 1
	const pageSize = Number(req.query.list_size) || 10
	const skip = (pageNumber - 1) * pageSize
	return { pageNumber, skip }
}

export const getTotalPages = (count: number, pageSize: number) => Math.ceil(count / pageSize)

export const WithPagination = (
	req: PaginationRequest,
	res: Response,
	next: NextFunction
) => {
	try {
		const { pageNumber, skip } = getPageAndSkipValues(req)
		req.pageSize = pageNumber
		req.skip = skip
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
};
