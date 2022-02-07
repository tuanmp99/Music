
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = document.querySelector('.playlist')
const thumbScroll = $('.cd')
const headerHeading2 = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const togglePlay = document.querySelector('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const randomSong = $('.btn-random')

const app = {
    isRandom: false,
    isplaying: false,
    currenIndex: 0,
    songs: [
    {
        heading: 'Girls Like You ' ,   
        name: 'Girls Like You',
        singer: 'Maroon 5 ft. Cardi B (Acoustic Cover)',
        path: './assets/music/Girl_like_you.mp3',
        image: './assets/img/hu.jpg'
    },
    {
        heading: 'Love Me Like You Do',
        name: 'Love Me Like You Do',
        singer: 'Pham Minh Tuan',
        path: './assets/music/Love_me_like_you_do.mp3',
        image: './assets/img/love_me.jpg'
    },
    {
        heading: 'Dusk Till Dawm',
        name: 'Dusk Till Dawm',
        singer: 'Pham Minh Tuan',
        path: './assets/music/Dusk_till_down.mp3',
        image: './assets/img/zayn.jpg'
    },
    {
        heading: 'As Long As You Love Me',
        name: 'As Long As You Love Me',
        singer: 'Anthem Lights Cover',
        path: './assets/music/As_long.mp3',
        image: './assets/img/justin.jpg'
    },
    {
        heading: 'As Long As You Love Me',
        name: 'As Long As You Love Me',
        singer: 'Anthem Lights Cover',
        path: './assets/music/As_long.mp3',
        image: './assets/img/justin.jpg'
    },

],

render: function(){
    const htmls = this.songs.map(song => {
            return `
            <div class="song">
            <div class="thumb" 
                style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
    })
    playlist.innerHTML = htmls.join('')
},
handleEvent: function(){
    const cdWidth = thumbScroll.offsetWidth
   
    document.onscroll = function(){
      const scrollTop =  window.scrollY
      const newWidth = cdWidth - scrollTop
      thumbScroll.style.width =  newWidth > 0 ? newWidth + 'px' : 0
      thumbScroll.style.opacity = newWidth/cdWidth
    }   
     //Animation
     var Animations = cdThumb.animate([
        // keyframes
    {transform: 'rotate(360deg)'}
    ], 
    //timing options
    {
        duration: 10000,
        iterations: Infinity
    }
    )
    Animations.pause()

    togglePlay.onclick = function (){
       if (app.isplaying){
           app.isplaying = false
           audio.pause() 
           player.classList.remove('playing')
            // Khi click pause thi Animations dung
           Animations.pause()
       }
       else{
       
        audio.play()
        player.classList.add('playing')
        // Khi click play thi Animations chay
        Animations.play();
        app.isplaying = true 

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate  = function(){
           progress.value = (audio.currentTime/audio.duration*100)
        // Xử lý khi tua    
         progress.onchange = function(e){
           audio.currentTime = e.target.value * audio.duration /100
        }   
       }   
    }  
    }
    // Next song
    btnNext.onclick = function(){
         app.nextSongs()
         Animations.play()
         player.classList.add('playing')
         app.isplaying = true 
         if(app.isRandom){
            app.randomSongs()
         }
         
         audio.play()
    }
    // Back song
    btnPrev.onclick = function(){
        if(app.isRandom){
            app.randomSongs()
         }
        app.backSongs()
        audio.play()
        Animations.play()
       
    }
    randomSong.onclick = function(){
        app.isRandom = !app.isRandom
        randomSong.classList.toggle('active', app.isRandom)
    }

    audio.onended = function(){
        app.nextSongs()
        app.loadCurrenSong()
        audio.play()
    }

},
 // chuyen sang bai tiep theo
nextSongs: function(){
    this.currenIndex++
    if (this.currenIndex >= this.songs.length)
    {
        this.currenIndex = 0;
    }
    this.loadCurrenSong();
},

// Quay nguoc lai bai hat
backSongs: function(){
      this.currenIndex--;
      if(this.currenIndex < 0 )
      {
        this.currenIndex = app.songs.length - 1;
      }
      this.loadCurrenSong();
},
// Random bai hat
randomSongs: function(){
        let newIndex 
    do {   
        newIndex = Math.floor(Math.random() * this.songs.length);
    }   while ( newIndex === this.currenIndex  )
        this.currenIndex = newIndex;
        this.loadCurrenSong();  
},

loadCurrenSong: function(){
    headerHeading2.textContent = this.getCurrenSong().heading
    cdThumb.style.backgroundImage = `url(${this.getCurrenSong().image})`
    audio.src = this.getCurrenSong().path
},
getCurrenSong: function (){
    return this.songs[this.currenIndex]
},  

start: function(){
    this.getCurrenSong()
    this.loadCurrenSong()
    this.render()
    this.handleEvent()
  
}
}

app.start()
