var token = 'paste_your_token_here';

    

    setTimeout(() => {
      instagramMainData(null);
    }, 1);

    async function instagramMainData() {
        const apiURL = `https://api.instagram.com/v1/users/self/?access_token=`+token+`&callback=?`;
        const fApi = await fetch(apiURL);
        const IgInfo = await fApi.json();

        let Title = document.createElement("div");
        let pageTitle = document.querySelector("#pageTitle");
        let username = document.createElement("div");
        let user = document.querySelector("#username");
        let desc = document.createElement("div");
        let description = document.querySelector("#description");
        let link = document.createElement("div");
        let linkButton = document.querySelector("#followButtonLink");
        let browTitle = document.createElement("title");
        let browserTitle = document.querySelector("#browserTitle");

        browTitle.innerHTML = IgInfo.data.full_name;

        Title.innerHTML = `` +IgInfo.data.full_name;

        username.innerHTML = `@` +IgInfo.data.username 
        +'<br><br><i class="fas fa-images"></i> ' +IgInfo.data.counts.media
        +'  <i class="fas fa-users"></i> ' +IgInfo.data.counts.followed_by.toLocaleString('en-US')
        +'  <i class="fas fa-eye"></i> ' +IgInfo.data.counts.follows.toLocaleString('en-US')
        
        desc.innerHTML = `` +IgInfo.data.bio;

        link.innerHTML = `
        <h3 class="title is-5">
          <a class="button is-primary" href="https://instagram.com/`+IgInfo.data.username +`" target="blank">
            <strong> 
              <i class="fab fa-instagram"></i> Siga no Instagram :)
            </strong>
          </a>
        </h3>
        `

   /*   fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&callback=?')
          .then(res => res.json())
            .then(res => res.data.forEach(function(data){
              let posts = '';
              

              for(let i = 0 ; i < 1 ; i++){
                posts = data.images.standard_resolution.url;
              }
              
              console.log(posts)

            })) */
            
        browserTitle.appendChild(browTitle);
        pageTitle.appendChild(Title);
        user.appendChild(username);
        description.appendChild(desc);
        linkButton.appendChild(link);

        //console.log(IgInfo.data.username)

    }