
export default interface RequiresUpdateMeta {
  fileUrl: string,
  hasFile: boolean;
  needsUpdate: boolean;
  lastModified: Date | null,
}
