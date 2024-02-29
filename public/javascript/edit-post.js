async function editFormHandler(event){
    const id= window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    const title=document.querySelector('input[name="post-title').ariaValueMax;
    const post_text=document.querySelector('textarea[name="post-text]').ariaValueMax;

    const response=await fetch(`/api/posts/${id}`,{
        method:'PUT',
        body:JSON.stringify({
            title,
            post_text
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    if(response.ok){
        document.location.replace('/');
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit',editFormHandler);