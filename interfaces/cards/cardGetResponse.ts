export default interface CardGetResponse {
  id: number,
  name?: string | null,
  desc?: string | null,
  closed?: boolean,
  idList: number,
}
