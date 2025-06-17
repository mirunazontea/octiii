document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const basket = document.getElementById('basket');
    const messageOverlay = document.getElementById('message-overlay'); // Renamed
    const bigHeart = document.getElementById('big-heart'); // Renamed
    const mainMessage = document.getElementById('main-message');

    // Ascunde inițial suprapunerea de mesaj și inima mare
    messageOverlay.style.display = 'none';
    bigHeart.style.display = 'none';
    mainMessage.style.display = 'none'; // Ascunde mesajul la început

    // Obține pozițiile elementelor după ce DOM-ul este complet încărcat
    let ballRect = ball.getBoundingClientRect();
    let basketRect = basket.getBoundingClientRect();

    ball.addEventListener('click', () => {
        // Dezactivează clic-ul pe minge pentru a preveni multiple animații
        ball.style.pointerEvents = 'none';

        // Recalculează pozițiile la momentul clic-ului, pentru acuratețe
        ballRect = ball.getBoundingClientRect();
        basketRect = basket.getBoundingClientRect();

        // Calculează exact cât trebuie să se miște mingea
        // Targetul este centrul coșului
        const targetX = (basketRect.left + basketRect.width / 2) - (ballRect.left + ballRect.width / 2);
        const targetY = (basketRect.top + basketRect.height / 2) - (ballRect.top + ballRect.height / 2);

        // Aplică transformarea pentru animație de aruncare
        ball.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Curba de animație mai complexă
        ball.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.8)`; // Se micșorează puțin pe măsură ce urcă

        // După ce mingea intră în coș (la finalul animației)
        setTimeout(() => {
            ball.style.display = 'none'; // Ascunde mingea

            // Poziționează inima mare în centrul ecranului (sau relativ la coș)
            // Vom poziționa inima în centrul message-box-ului, care deja e centrat.
            // Acum doar o facem vizibilă și așteptăm animația CSS
            messageOverlay.style.display = 'flex'; // Arată suprapunerea
            bigHeart.style.display = 'block'; // Arată inima

            // Așteaptă animația inimii (popIn + pulse) să se termine înainte de a afișa mesajul
            setTimeout(() => {
                bigHeart.style.display = 'none'; // Ascunde inima
                mainMessage.style.display = 'block'; // Arată mesajul
            }, 1800); // Lăsăm mai mult timp pentru animația inimii
        }, 800); // Același timp ca și tranziția mingii
    });
});