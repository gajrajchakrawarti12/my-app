import { User } from "./User"

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {(email: string, password: string) => Promise<boolean>} login
 * @property {(name: string, email: string, password: string, role: string) => Promise<boolean>} signup
 * @property {() => void} logout
 * @property {boolean} isLoading
 * @property {(username: string) => Promise<boolean>} checkValidUsername
 */

export { User }