const commentformhandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    post_id,
                    comment_text
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                document.location.reload();
            } else {
               
                alert(`Error: ${response.statusText}`);
            }
        } catch (error) {
            
            console.error('Error during fetch:', error);
            alert('An error occurred while processing your request.');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentformhandler);