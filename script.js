const loadData = async (search,isShowAll) => {
  toggleLoading(true);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${search}`
  );
  const data = await res.json();
  const phones = data.data;
  toggleLoading(false);
  displayPhones(phones, isShowAll);
};

// loadData();

const phoneContainer = document.getElementById("phone-container");
const showAllBtn = document.getElementById("showAllBtn");

const displayPhones = (phones, isShowAll) => {
  phoneContainer.textContent = "";
  
  isShowAll ? false : phones = phones.slice(0, 12)
  if (phones.length >= 12) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
  console.log(isShowAll);
  phones.forEach((element) => {
    const div = document.createElement("div");
    div.classList = "card w-80 lg:w-72 xl:w-96 bg-base-100 shadow-xl mx-auto";
    div.innerHTML = `<figure class="px-10 pt-10">
        <img src="${element.image}" alt="Phones" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${element.phone_name}</h2>
        <p>${element.slug}</p>
        <div class="card-actions">
          <button class="btn btn-accent" onclick="showModal('${element.slug}')">Show More</button>
        </div>
      </div>`;
    phoneContainer.appendChild(div);
  });
};

const input = document.getElementById("input");
 function displayDataBtn(isShowAll) {
  const inputValue = input.value;
  loadData(inputValue,isShowAll);
};

const loading = document.getElementById("loading");

const toggleLoading = (isToggle) => {
  if (isToggle) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

// Show All the Item
showAllBtn.addEventListener("click", () => {
  displayDataBtn(true);
});


// Modal section

async function showModal(id) {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phonesData = data.data;
  my_modal.showModal();
  modalDataInject(phonesData)
}
const modalData = document.getElementById("modal-data");

function modalDataInject(data) {
  console.log(data);
  modalData.innerHTML = `<figure><img src="${data.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title justify-center">${data.name}</h2> <hr>
    <p><span class="font-semibold">Release Date: </span>${data?.releaseDate || " Release Date for this phone is unavalavil"}</p>
    <p> <span class="font-semibold">Storage: </span>${data?.mainFeatures.memory || "Memory status for this phone is unavalavil"}</p>
    <p> <span class="font-semibold">Sensors: </span>${data?.mainFeatures.sensors.join(", ") || "Memory status for this phone is unavalavil"}</p>

    <hr>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>`
}
