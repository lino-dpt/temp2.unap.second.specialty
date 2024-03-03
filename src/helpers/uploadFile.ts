// This function is used to detect the actual image type,

const getMimeType = (file, fallback = null) => {
    const byteArray = new Uint8Array(file).subarray(0, 4);
    let header = "";
    for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16);
    }
    switch (header) {
        case "89504e47":
            return "image/png";
        case "47494638":
            return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            return "image/jpeg";
        default:
            return fallback;
    }
};

const loadImageHelper = (event) => {
    let files = event.target.files;

    //validar que el archivo sea una imagen
    if (!files[0].type.match("image.*")) {
        alert("Solo se permiten imagenes");
        return false;
    }
    //validar que el archivo no supere el tamaño maximo 2MB

    if (files[0].size > 5000000) {
        alert("El archivo no debe superar los 5MB");
        return false;
    }

    var image = {
        src: null,
        type: null,
    };

    if (files && files[0]) {
        if (image.src) {
            URL.revokeObjectURL(image.src);
        }

        const blob = URL.createObjectURL(files[0]);
        image.src = blob;

        image.type = getMimeType(event.target.result, files[0].type);
        return image;
    } else {
        return false;
    }
};

export { loadImageHelper, getMimeType };
