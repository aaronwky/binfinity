document.addEventListener("DOMContentLoaded", function () {
    const memoryCards = document.querySelectorAll(".memory-card");
    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matchedPairs = 0;
  
    // Function to flip the card
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add("flip");
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
      } else {
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();
      }
    }
  
    // Function to check if the cards match
    function checkForMatch() {
      if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === memoryCards.length / 2) {
          // All cards matched
          const wrap = document.getElementById("wrap");
          wrap.style.display = "block";
        }
      } else {
        unflipCards();
      }
    }
  
    // Function to disable the cards if they match
    function disableCards() {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      resetBoard();
    }
  
    // Function to unflip the cards if they don't match
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        resetBoard();
      }, 1000);
    }
  
    // Function to reset the board for the next turn
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    // Shuffle the cards
    (function shuffle() {
      memoryCards.forEach(card => {
        const randomPos = Math.floor(Math.random() * memoryCards.length);
        card.style.order = randomPos;
      });
    })();
  
    // Add click event listeners to your memory cards
    memoryCards.forEach((card) => {
      card.addEventListener("click", flipCard);
    });
  
    // Restart the game
    const restartButton = document.getElementById("play-again-btn");
    restartButton.addEventListener("click", () => {
        // Reload the page
        window.location.reload();
    });
      
      // Reset the game state
      memoryCards.forEach((card) => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
      });
      shuffle();
      resetBoard();
      matchedPairs = 0;
    });
  