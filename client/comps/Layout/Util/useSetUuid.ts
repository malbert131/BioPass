import Util from './util'


async function useSetUuid(email: string) {
    const uuid = await Util.getUuid(email)
    sessionStorage.setItem('uuid', uuid);
}

export default useSetUuid