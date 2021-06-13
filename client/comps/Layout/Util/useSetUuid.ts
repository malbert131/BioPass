import Util from './util'


async function useSetUuid(email: string) {
    console.log(email)
  const uuid = await Util.getUuid(email)
  console.log(uuid)
    sessionStorage.setItem('uuid', uuid);
}

export default useSetUuid