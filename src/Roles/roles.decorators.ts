import { SetMetadata } from "@nestjs/common";
import { Role } from "./role.enum";

// The decorator allows us to specify what role are required to access a specific route/resource. 
export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);