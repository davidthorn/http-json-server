export interface Identifiable {
    id: string;
}
/**
 *
 *
 * @param {string} name
 * @returns
 */
declare function Database(name: string, completion: () => void): {
    add: (item: Identifiable) => void;
    read: () => Promise<Identifiable[]>;
    exists: (id: string) => Promise<Boolean>;
};
export default Database;
//# sourceMappingURL=server.d.ts.map