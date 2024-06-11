//JS built in number format
export const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd"
})