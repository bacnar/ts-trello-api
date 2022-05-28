export default interface BoardCreateRequest {
  idMember: number,
  name: string,
  defaultLists?: boolean,
  desc?: string,
}
