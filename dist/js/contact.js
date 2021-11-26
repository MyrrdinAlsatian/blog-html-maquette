export function fromContactSubmit(ev) {
    ev.preventDefault();
    ev.target["send"].disabled = true;
    let data = new FormData(ev.target);
    const query = new URLSearchParams();
    Array.from(data.keys()).forEach(k => query.set(k, data.get(k)));
    const url = 'https://script.google.com/macros/s/AKfycbw_27Ft7GNulFnikPpeaTQkwTjVSCq90M9xhCs9omXkt1rmY5M/exec';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: query
    }).then(response => {
        console.log(response.json());
        ev.target.reset();
        console.log(ev.target["send"]);
        ev.target["send"].disabled = false;
        ev.target["send"].value = 'send';
        setTimeout(() => {
            ev.target["send"].value = '';
        }, 2000)
    }).catch(error => {
        ev.target["send"].value = 'not-send';
        console.log(error.message)
        setTimeout(() => {
            ev.target["send"].value = '';
        }, 2000)
    })
}