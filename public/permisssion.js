import {useUserStore} from "@/stores/user.js";

export default function havePermission() {
    const userStore = useUserStore()
    for (let i = 0; i < arguments.length; i++) {
        if (!userStore.permissions.includes(arguments[i]))
            return false
    }
    return true
}