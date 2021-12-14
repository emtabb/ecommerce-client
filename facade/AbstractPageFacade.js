export default class AbstractPageFacade {

    static initialEnvProperties() {
        return {
            SPACE_NAME : process.env.SPACE_NAME,
            API : process.env.ESPACE_API,
            DEFAULT_COLOR : process.env.DEFAULT_COLOR,
            FOOTER_CONTACT : process.env.FOOTER_CONTACT,
            FOOTER_ADDRESS : process.env.FOOTER_ADDRESS,
            CATEGORY_REQUEST : process.env.CATEGORY_REQUEST
        }
    }
}