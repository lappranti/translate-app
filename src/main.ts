document.addEventListener("DOMContentLoaded", function () {
  const btnTranslate = document.getElementById("translateBtn");
  const textArea = document.getElementById("textID") as HTMLTextAreaElement;
  const translationContent = document.getElementById(
    "translationContent"
  ) as HTMLElement;
  const dropdowns = document.querySelectorAll(".dropdown");

  const apiConfig: any = {
    baseUrl: "https://api.mymemory.translated.net/get?q=",
    restApi: "!&langpair=",
    langFrom: "en",
    langTo: "fr",
  };

  let textToTranslate: string = "";
  let textTranslated: string = "";

  getLanguages();

  btnTranslate?.addEventListener("click", getTranslation);
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      const dropdownType = dropdown.getAttribute("id");
      const clickedElement = e.target as HTMLElement;
      const dropdownContent = dropdown.querySelector(".dropdown-content");

      dropdownContent?.classList.toggle("show");
      if (clickedElement.classList.contains("dropdown-option")) {
        chooseLang(clickedElement.getAttribute("id") || "", dropdownType || "");
      }

      if (dropdownContent?.classList.contains("show")) {
        document.addEventListener("click", (e) => {
          if (!dropdown.contains(e.target as Node)) {
            dropdownContent.classList.remove("show");
            this.removeEventListener;
          }
        });
      }
    });
  });

  function getTranslation() {
    textToTranslate = encodeString(textArea.value);
    // textToTranslate = textArea.value;
    // console.log(textToTranslate);

    fetch(
      `${apiConfig.baseUrl}${textToTranslate}${apiConfig.restApi}${apiConfig.langFrom}|${apiConfig.langTo}`
    )
      .then((response) => response.json())
      .then((data) => {
        textTranslated = data.responseData.translatedText;
        translationContent.innerHTML = textTranslated;
        console.log(textTranslated);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function encodeString(str: string) {
    return encodeURIComponent(str);
  }

  function getLanguages() {
    fetch("../public/languages.json")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        dropdowns.forEach((dropdown) => {
          const dropdownContent = dropdown.querySelector(".dropdown-content");
          data.forEach((lang: { [x: string]: any; language: any }) => {
            const option = ` <div id=${lang.ISO}  class="dropdown-option py-2 pb-1 pl-4 pr-6 border-b border-[#4D5562] cursor-default">${lang.language} </div>`;
            if (dropdownContent) {
              dropdownContent.innerHTML += option;
            }
          });
        });
      })
      .catch((error) => console.error("Error fetching languages:", error));
  }

  function chooseLang(lang: string, type: string) {
    console.log(lang);
    console.log(type);
    if (type === "dropdownFrom") {
      apiConfig.langFrom = lang;
    } else if (type === "dropdownTo") {
      apiConfig.langTo = lang;
    }
    getTranslation();
  }
});
