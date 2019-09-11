var token = 'paste_your_token_here';




    var pic = document.createElement("div");
    fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&callback=?')
      .then(res => res.json())
        .then(res => res.data.forEach(function(data){
          let post = document.createElement("div");
          let root = document.querySelector("#root");
          let profilePic = document.querySelector("#profilePic");

          
          const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ]

            var date = new Date(parseInt(data.created_time) * 1000);
            const year = date.getFullYear()
            const Day = date.getDate()
            const Month = date.getMonth()
            const monthName = months[Month]
            const hour = date.getHours()
            const minute = date.getMinutes()

            const dateforma = `${monthName}, ${Day} ${year} at ${hour}:${minute}`

            const tag = [];

            for(let i = 0 ; i < (data.tags).length ; i++){
                tag[i] = '<a href="https://www.instagram.com/explore/tags/'+data.tags[i]+'/" target="blank">#'+data.tags[i]+'</a>';
            }
            
            if(data.caption == null) {
                var description = '<span class="is-italic">Sem descrição.</span>';
                var title = "Título não disponível"
            } else {
                var description = data.caption.text.substring(data.caption.text.indexOf('|') + 1);
                var title = data.caption.text.substr(0, data.caption.text.indexOf(' | ')); 
            } if(title.length < 5) {
                var title = 'Título não disponível';
            }

            if(data.location == null){
                var location = 'Local não definido'
            } else {
                var location = data.location.name
            }

            console.log('CAROUSEL test > ',data.carousel_media)
        
            pic.innerHTML = '<img class="profile is-rounded" src="'+data.user.profile_picture+'">'
        
            post.innerHTML = ` 
            <span onclick="showAbstract('https://api.instagram.com/v1/media/${data.id}/comments?access_token=`+token+`', '${data.id}')">
                <div class="card"><div class="card-image">
                    <figure class="image is-4by3">
                        <img class="mainCardImage" src="${data.images.standard_resolution.url}" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                    <figure class="image is-48x48">
                        <img class="profile is-rounded" src="${data.user.profile_picture}" alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="media-content">
                      <p class="title is-4">${title}</p>
                      <p class="subtitle is-7"><a href="https://instagram.com/${data.user.username}" target="blank">@${data.user.username}</a></p>
                      </div>
                  </div>
          
                  <div class="content cardContent">
                    ${description}
                      <br>
                        ${tag.join(' ')}
                      <br>
                      <i class="fas likes fa-heart"></i> 
                        ${data.likes.count} 
                      <i class="fas comments fa-comment"></i> 
                        ${data.comments.count}
                      <br>
                      <div class="is-italic">
                        <i class="fas fa-map-marker-alt"></i> 
                          ${location}
                      </div>
                      <div class="is-italic">
                        <i class="far fa-clock"></i> 
                          ${dateforma}
                      </div>
                    </div>
                  </div>
                </div>
              </span>
              `;
        
              root.appendChild(post);
              profilePic.appendChild(pic);
    
    }))

    // The function showAbstract() is executed when a card is clicked, and then it reorganizes all the content

    function showAbstract(link, post_id) {
      //console.log(link);
      let selection = document.createElement("div");
      let selected = document.querySelector("#selected");            
      document.getElementById("selected").innerHTML = "";
      selection.innerHTML = `<h1>JÁ ELVIS</h1>`
      selected.appendChild(selection);
      //  console.log('id do post',post_id)        
  
      fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&callback=?')
        .then(res => res.json())
          .then(res => res.data.forEach(function(data){
            let id = post_id;
              if(id == data.id) {
                if(data.caption == null) {
                  var description = 'sem descrição';
                  var title = "Título não disponível"
                } else {
                    var description = data.caption.text.substring(data.caption.text.indexOf('|') + 1);
                    var title = data.caption.text.substr(0, data.caption.text.indexOf(' | ')); 
                } if(title.length < 5) {
                    var title = 'Título não disponível';
                }
  
                  const months = [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December'
                    ]
  
                  // Getting the date information
                  var date = new Date(parseInt(data.created_time) * 1000);
                  const year = date.getFullYear()
                  const Day = date.getDate()
                  const Month = date.getMonth()
                  const monthName = months[Month]
                  const hour = date.getHours()
                  const minute = date.getMinutes()     
                  
                  const dateforma = `${monthName}, ${Day} ${year} at ${hour}:${minute}`
  
                  var profile_pic = data.user.profile_picture;
                  var link = data.link;
                  // console.log(data.caption.text)
                  selection.innerHTML = `
                    <div class="first-section hero is-medium">
                      <div class="hero-body">
                        <div class="container has-text-centered">
                          <div class="columns is-vcentered has-text-justified">
                            <div class="column is-5">
                              <figure  class="image is-128x128">
                                <img class="profile is-rounded" src="${profile_pic}" alt="Placeholder image">
                              </figure>
                              <h1 id="pageTitle" class="title is-1">
                                ${title}
                              </h1>
                              <h3 id="username" class="title is-3 has-text-grey">
                                <i class="far fa-clock"></i> ${dateforma}
                              </h3>
                              <h3 id="description" class="title is-2 has-text-grey">
                                <i class="fas fa-heart"></i> ${data.likes.count} <i class="fas fa-comment"></i> ${data.comments.count}                                      
                              </h3>
                              <h3 class="title is-5">
                                <a class="button is-primary" href="${link}" target="blank">
                                  <strong>
                                    <i class="fab fa-instagram"></i> Veja no instagram :)
                                  </strong>
                                </a>
                              </h3><br>
                              <h3 class="title is-5">
                                <a class="button is-warning" href="./">
                                  <span class="icon">
                                    <i class="fas fa-chevron-left"></i>
                                  </span>
                                  <strong>Voltar para resenhas</strong>
                                </a>
                              </h3>
                              </div>
                              <div class="column is-6 is-offset-1">
                                <figure class="mainImageAbstract is-4by3">
                                  <img class="mainImageAbstract" src="${data.images.standard_resolution.url}" alt="Description">
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                
                      <section class="section abstractSection">
                        <div class="container">
                          <div class="container Abstract">
                            <div class="abstractView">
                              <h2 class="subtitle has-text-centered is-1 has-text-justified">
                                ${description}
                              </h2><br>
                              <h3 id="description" class="title is-1 has-text-centered">
                                  <i class="fas fa-heart has-text-danger"></i> ${data.likes.count} <i class="fas fa-comment has-text-info"></i> ${data.comments.count}                                      
                              </h3><br>
                              <div id="commentArea">
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>                    
                      `
  
                      // Next fetch gets the post's comments.
  
                     fetch('https://api.instagram.com/v1/media/'+post_id+'/comments?access_token='+token+'&callback=?')
                      .then(res => res.json())
                        .then(res => res.data.forEach(function(data){        
                          //console.log('id', post_id)
                          //console.log('teste segundo fetch >',data);
  
                          // As long as we can't show comments from other users, that array selects randomly a user pic.
                          const user = ["./images/boy-random-user.png", "./images/girl-random-user.png"];
                          var random_user = user[Math.floor(Math.random()*user.length)];
  
                          const months = [
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December'
                            ]
  
                          // Getting the date information
                          var date = new Date(parseInt(data.created_time) * 1000);
                          const year = date.getFullYear()
                          const Day = date.getDate()
                          const Month = date.getMonth()
                          const monthName = months[Month]
                          const hour = date.getHours()
                          const minute = date.getMinutes()
  
                          const dateforma = `${monthName}, ${Day} ${year} at ${hour}:${minute}`
                          
                          let commentary = document.createElement("div");
                          let comment = document.querySelector("#commentArea");  
                    
                          commentary.innerHTML = `
                            <article class="media">
                              <figure class="media-left">
                                <p class="image is-64x64">
                                  <img class="profile is-rounded" src="${random_user}">
                                </p>
                              </figure>
                              <div class="media-content">
                                <div class="content">
                                  <p>
                                    <strong>@UsuárioDoInstagram</strong>
                                    <br>
                                      <span class="is-italic">Para proteger a privacidade dos nossos seguidores não vamos mostrar usuários e seus comentários neste site. Para acessar o comentário original clique no link abaixo para se redirecionar à publicação no Instagram.</span>
                                    <br>
                                    <small><a href="${link}" target="blank">Visualizar comentário no Instagram</a>
                                  </p>
                                </div>
                                <article class="media">
                                  <figure class="media-left">
                                    <p class="image is-48x48">
                                      <img class="profile is-rounded" src="${profile_pic}">
                                    </p>
                                  </figure>
                                  <div class="media-content">
                                    <div class="content">
                                      <p>
                                        <strong>${data.from.username}</strong>
                                        <br>
                                          ${data.text}
                                        <br>
                                        <small><a href="${link}" target="blank">Like</a> · <a href="${link}" target="blank">Reply</a> · ${dateforma}</small>
                                      </p>
                                    </div>
                                  </div>
                                </article>
                              </div>
                            </article><br>
                            `
          
                            comment.appendChild(commentary);
          
                        }))
                      
              }
            }))
          }