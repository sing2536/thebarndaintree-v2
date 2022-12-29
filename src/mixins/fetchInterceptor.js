import router from "../router";
import { useLoaderStore } from "../stores/loader";
import errorHandler from "./errorHandler";

const { fetch: originalFetch } = window

export default () => {
    const loader = useLoaderStore()

    window.fetch = async (...args) => {
        let [resource, config ] = args;
        // request interceptor here
        const res = await originalFetch(resource, config);
        // response interceptor here
        if (res.status == 401) {
            loader.active = false
            if (location.pathname == import.meta.env.BASE_URL+'signin') return res
            router.push('/signin')
            throw new Error('Unauthorised')
        }

        await errorHandler(res)

        return res;
    };
}