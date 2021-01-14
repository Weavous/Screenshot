class MediaTrack {
    /**
     * Back.
     * 
     * @var string
     */
    static ENVIRONMENT = "environment";

    /**
     * Frontal.
     * 
     * @var string
     */
    static USER = "user";

    /**
     * Constructor.
     * 
     * @param {Void}
     */
    constructor() { }

    /**
     * Init.
     * 
     * @param {Void}
     */
    init() { }

    /**
     * Post.
     * 
     * @param {String} base64
     */
    post(ImageBase64) {
        const HTTPRequest = new XMLHttpRequest();

        HTTPRequest.open("POST", "save_photos.php", true);
        HTTPRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

        HTTPRequest.onload = function () {
            if (HTTPRequest.status >= 200 && HTTPRequest.status < 400) {
                const data = JSON.parse(HTTPRequest.responseText);

                if (data.error) {
                    alert(data.error);

                    return false;
                }
            } else {
                alert("Erro ao salvar. Tipo:" + HTTPRequest.status);
            }
        };

        HTTPRequest.onerror = function () {
            alert("Erro ao salvar. Back-End inacessível.");
        }

        HTTPRequest.send(`path=${ImageBase64}`);
    }
}

/**
 * 
 */
function loadCamera() {
    const video = document.querySelector("#camera");

    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: MediaTrack.USER } })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (error) {
                alert(error);
            });
    }
}

/**
 * 
 */
function take() {
    const video = document.querySelector("#camera");

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64 = canvas.toDataURL("image/jpeg");

    (new MediaTrack()).post(base64);
}