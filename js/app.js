
const message = document.getElementById( 'message' );
const searchPhone = async () => {
  const searchText = document.getElementById( 'search-value' );
  const searchValue = searchText.value;
  if ( searchValue == '' ) {
    message.innerText = 'Enter search value!';
  } else {
    searchText.value = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${ searchValue }`;
    const res = await fetch( url );
    const data = await res.json();
    displayPhone( data.data );
    message.innerText = "";
  }
};

const displayPhone = phones => {
  const main = document.getElementById( 'main' );
  main.textContent = '';

  phones.forEach( phone => {
    const div = document.createElement( 'div' );
    div.classList.add( 'card' );
    div.classList.add( 'card-phone' );
    div.innerHTML = `
        <img src="${ phone.image }" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${ phone.phone_name }</h5>
          <a onclick="loadDetails('${ phone.slug }')" class="btn btn-primary">Details</a>
        </div>
    `;
    main.appendChild( div );
  } );
};

const loadDetails = async phoneId => {
  const url = `https://openapi.programming-hero.com/api/phone/${ phoneId }`;
  // console.log( url );
  const res = await fetch( url );
  const data = await res.json();
  displauSingleDetails( data.data );
  // console.log( data );
};
const displauSingleDetails = ( phone ) => {
  // console.log( phone );
  const singleDetails = document.getElementById( 'single-details' );
  singleDetails.textContent = '';
  const div = document.createElement( 'div' );
  div.classList.add( 'card' );
  div.classList.add( 'single' );
  div.innerHTML = `
        <h3 style="text-align: center; margin-top: 20px; color: blue;">${ phone.brand }</h3>
        <img src="${ phone.image }" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Name: ${ phone.name }</h5>
          <p>${ phone.releaseDate }</p>
          <p>Storage: ${ phone.mainFeatures.storage }</p>
          <p>Display: ${ phone.mainFeatures.displaySize }</p>
          <p>Memory: ${ phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Data' }</p>
          <p>WLAN: ${ phone.others.WLAN }</p>
          <p>GPS: ${ phone.others.GPS }</p>
          <p>USB: ${ phone.others.USB }</p>
        </div>
    `;
  singleDetails.appendChild( div );
};



















