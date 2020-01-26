function abbreviate_number(value) {
    const suffixes = ["", "k", "m", "b", "t", "q"];
    let num_divides = 0;
    while (value > 1000){
        num_divides += 1;
        value = value / 1000;
    }
    value = Math.floor(value * 10);
    return (value / 10) + suffixes[num_divides];
}

function get_random_int(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_random_float(min, max) {
    return (Math.random() * (max - min)) + min;
}

function create_floating_text(scene, x, y, message, tint, size, bold, duration) {
    const text = scene.add.text(
        x,
        y,
        message,
        {
            fontSize: bold ? "bold " + size + "px" : size + "px",
            fill: '#ffffff',
            align: 'center'
        }
    );
    text.setTint(tint);
    text.setOrigin(0.5);
    const tween = scene.add.tween({
        targets: text,
        ease: 'Exponential.In',
        duration: duration,
        delay: 0,
        y: y - 50,
        alpha: 0,
        onComplete: () => {
            text.destroy();
        },
        callbackScope: scene
    });
    return text;
}
