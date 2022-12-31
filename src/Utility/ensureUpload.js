export const ensureUpload = (percent) => {
    setTimeout(() => 1000)
        .then(() => {
            if (percent === 100) {
                console.log("DONE")
            }
        })
}