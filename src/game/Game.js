let Game = {

    lockMode : false,
    firstCard : null,
    secondCard : null,

    instruments : [
        'Banjo',
        'Chocalho',
        'Guitarra',
        'Gusla',
        'Tamburitza',
        'Teclado',
        'Trompete',
        'Violão',
        'Violino'
    ],

     cards : null,

    // ----------------------------- //

        unFlipCards : function(){
            this.firstCard.flipped = false;
            this.secondCard.flipped = false;
            this.clearCards();
        },

     // ----------------------------- //

        checkMath : function (){
            if(!this.firstCard || !this.secondCard){
                return false
            }
            return this.firstCard.icon === this.secondCard.icon
        },

     // ----------------------------- //

        checkGameOver : function (){
            return this.cards.filter( card => !card.flipped ).length === 0
        },

     // ----------------------------- //

        clearCards(){
            this.firstCard = null;
            this.secondCard = null;
            this.lockMode = false;
        },

     // ----------------------------- //

        setCard : function(id){

            let card = this.cards.filter( card => card.id === id)[0]

            if(card.flipped || this.lockMode){
                return false
            }

            if(!this.firstCard){
                this.firstCard = card
                this.firstCard.flipped = true;
                return true
            }else{
                this.secondCard = card
                this.secondCard.flipped = true;
                this.lockMode = true
                return true
            }

            

        },

     // ----------------------------- //

        CreateCardFromInstruments : function (){

            this.cards = [];
        
            this.instruments.forEach( instrument =>{
                this.cards.push(this.CreatePairFromInstruments(instrument))
            })
        
            this.cards = this.cards.flatMap( e => e )
            this.shuffleCards()
            return this.cards
        },
    
    // ----------------------------- // 
    
        CreatePairFromInstruments : function (instrument){
        
            return [{
                id : this.createId(instrument),
                icon : instrument,
                flipped : false
            },{
                id : this.createId(instrument),
                icon : instrument,
                flipped : false
            }]
        },
        
        createId : function (instrument){
            return instrument + parseInt(Math.random() * 1000);
        },

    // ----------------------------- //

        shuffleCards : function (){

            let currentIndex = this.cards.length;
            let randomIndex = 0;

            while(currentIndex !== 0){
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex--;

                [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]] 
            }
        },

        flipCard: function(cardId, gameOverCallBack, noMatchCallBack){

            if(this.setCard(cardId)){
    
                if(this.secondCard){
        
                    if(this.checkMath()){
                        this.clearCards();
                            if(this.checkGameOver()){
                                // Game Over
                                setTimeout(()=>{
                                    gameOverCallBack();
                                }, 600)
                                
                            }
                    }else{
            
                    setTimeout(()=>{
                        // No Match
                        this.unFlipCards();
                        noMatchCallBack();
                    }, 700)
                        
                    };
                }
            } 

        }   
}

export default Game;