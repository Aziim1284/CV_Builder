import React from 'react'

const SocialLinkForm = ({profileRef ,pronameRef ,linkRef ,submitSocial}) => {
  return (
    <div className="container">
    <div class="row">
        <div class="col">
            <input type="text" class="form-control" name="profile" placeholder="Enter Social Profile Name" aria-label="profile" ref={profileRef} />
        </div>
        <div class="col">
            <input type="text" class="form-control" name="proname" placeholder="Enter Name" aria-label="proname" ref={pronameRef} />
        </div>
        <div class="col">
            <input type="text" class="form-control" name="link" placeholder="Enter Links" aria-label="link" ref={linkRef} />
        </div>


    </div>
    <br />
    <button className='btn btn-info' onClick={() => submitSocial()} >Submit Social profile</button>
    <br />

</div>
  )
}

export default SocialLinkForm