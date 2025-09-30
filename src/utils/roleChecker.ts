import {PayloadRequest} from "payload";

export const hasRole = (req: PayloadRequest, roles: string[]) => roles.includes(req.user?.role ?? '');
