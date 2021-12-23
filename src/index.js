import { StrictMode } from "react";
import ReactDOM from "react-dom";
import React from "react";
import { useState } from "react";
import "./styles.css";

//// DEFINE THE APP AND ALL IT CAN DO
const App = () => {
  // GLOBAL VARS
  let directoryURL = "https://doctors.nghs.com";
  let providerMaxResults = 20;
  let providerTotalremaining;
  let userInput = [];
  let userZip;
  let userSpecialty;
  let userSpecialtyEncoded;
  let userDistance;
  let sendData;
  let specialtyArray = [];
  let distanceArray = [
    "Any distance",
    "5 miles",
    "10 miles",
    "25 miles",
    "50 miles",
    "100 miles"
  ];

  //// ALL ITEM DATA
  const [items] = useState([
    {
      id: 0,
      isInit: true,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: true,
      userInputVar: "userSpecialty",
      linkedItems: [17, 18],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: false,
      optionSlug: "find-doctor",
      optionDisplayText: "Find a provider",
      responseDisplayText:
        "<p>Alright, let's get started.</p><p>What kind of provider are you looking for? Please make a selection below.</p>",
      userInputPlaceholder: "Select specialty:",
      userInputType: "select",
      selectArrayVar: "specialtyArray"
    },
    {
      id: 4,
      isInit: true,
      isActive: true,
      optionSortOrder: 0,
      linkedItems: [10, 11, 12, 13],
      userInputRequired: false,
      userInputVar: false,
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "visitation",
      optionDisplayText: "Visit a patient",
      responseDisplayText:
        "<p>For the protection of our patients, staff and community, our visitation guidelines have been updated. <a href='https://www.nghs.com/visitation' target='_blank'>View updated guidelines</a>.</p><p>What campus do you want to visit?</p>"
    },

    {
      id: 5,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      linkedItems: [0, 7, 1],
      userInputRequired: false,
      userInputVar: false,
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "new-patient",
      optionDisplayText: "New Patient",
      responseDisplayText:
        "Welcome, new patient! Here are some things you might want to do."
    },
    {
      id: 6,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      linkedItems: [0, 7, 4, 1],
      userInputRequired: false,
      userInputVar: false,
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "current-patient",
      optionDisplayText: "Current Patient",
      responseDisplayText: "Welcome back! How may we assist you?"
    },
    {
      id: 7,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "mychart",
      optionDisplayText: "Sign up for MyChart",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/mychart-info'>Click here</a> to learn all about MyChart."
    },
    {
      id: 8,
      isInit: true,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "pay-bill",
      optionDisplayText: "Pay a bill",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/pay-my-bill'>Click here</a> to learn how you can pay a bill."
    },
    {
      id: 9,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "medical-records",
      optionDisplayText: "I need some medical records.",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/medical-records'>Click here</a> to learn how you can request medical records from NGHS."
    },
    {
      id: 10,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "ngmc-gainesville",
      optionDisplayText: "NGMC Gainesville",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/gainesville'>Click here</a> to get details about NGMC Gainesville."
    },
    {
      id: 11,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "ngmc-braselton",
      optionDisplayText: "NGMC Braselton",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/braselton'>Click here</a> to get details about NGMC Braselton."
    },
    {
      id: 12,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "ngmc-barrow",
      optionDisplayText: "NGMC Barrow",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/barrow'>Click here</a> to get details about NGMC Barrow."
    },
    {
      id: 13,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "ngmc-lumpkin",
      optionDisplayText: "NGMC Lumpkin",
      responseDisplayText:
        "<a target='_blank' href='https://www.nghs.com/lumpkin'>Click here</a> to get details about NGMC Lumpkin."
    },
    {
      id: 14,
      isInit: true,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: false,
      userInputVar: false,
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "careers",
      optionDisplayText: "Job opportunities",
      responseDisplayText:
        "<p>Interested in joining our team? Great!</p><p>Click <a href='https://www.nghs.com/careers?ref=chat' target='_blank'> here</a> to learn more about opportunities currently available at our organization.</p>"
    },
    {
      id: 15,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: true,
      userInputVar: "userZip",
      linkedItems: [19, 18],
      showRequestBubble: false,
      showResponseBubble: true,
      showLinkedItems: false,
      optionSlug: "zipcode",
      optionDisplayText: "Yes",
      responseDisplayText: "<p>Please enter your zip code below.</p>",
      userInputPlaceholder: "Enter your zip code",
      userInputType: "number"
    },
    {
      id: 17,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: true,
      userInputVar: "",
      linkedItems: [15, 18],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "by-zip",
      optionDisplayText: "Search by zip code",
      responseDisplayText:
        "Do you want to find a provider who practices near a specific zip code?",
      userInputPlaceholder: "",
      userInputType: "",
      selectArrayVar: ""
    },

    {
      id: 18,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: true,
      userInputVar: "userZip, userSpecialty",
      linkedItems: [],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "show-results",
      optionDisplayText: "No",
      responseDisplayText: "Searching...",
      userInputPlaceholder: "",
      userInputType: "",
      selectArrayVar: ""
    },

    {
      id: 19,
      isInit: false,
      isActive: true,
      optionSortOrder: 0,
      userInputRequired: true,
      userInputVar: "userDistance",
      linkedItems: [18],
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: false,
      optionSlug: "distance",
      optionDisplayText: "Set distance",
      responseDisplayText:
        "How far are you willing to travel to visit a provider?",
      userInputPlaceholder: "Select distance:",
      userInputType: "select",
      selectArrayVar: "distanceArray"
    },
    {
      id: 1,
      isInit: true,
      isActive: true,
      sortOrder: 0,
      linkedItems: [5, 6],
      userInputRequired: false,
      userInputVar: false,
      showRequestBubble: true,
      showResponseBubble: true,
      showLinkedItems: true,
      optionSlug: "something-else",
      optionDisplayText: "Something else",
      responseDisplayText:
        "Alright, let’s help you find what you're looking for. Are you a new patient or a current patient?"
    }
  ]);

  // CREATE THE INITIAL SET OF OPTIONS
  const Items = ({ items }) => {
    return (
      <>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </>
    );
  };
  // CREATE EACH OPTION
  const Item = ({ item }) => {
    if (item.isActive && item.isInit) {
      let tabIndex = 1000;
      return (
        <div className="item">
          <div
            className="chatoption fade-in"
            onClick={() => onOptionClick(item)}
            onKeyUp={(event) => onKeyUp(event)}
            tabIndex={tabIndex}
            title={item.optionDisplayText}>
            {item.optionDisplayText}
          </div>
        </div>
      );
    } else {
      return false;
    }
  };

  /****************** ON OPTION CLICK *******************/

  const onOptionClick = (item) => {
    // DISABLE THE OTHER OPTIONS FROM BEING CLICKED
    let itemsContainer = document.querySelector(".items-container");
    itemsContainer.classList.add("disabled");

    // TODO: PREVENT TABBING TO OLD OPTIONS
    /* let chatItems = document.querySelectorAll(
      ".items-container.disabled .item .chatoption"
    );
    chatItems.forEach((chatItem) => {
      chatItem.removeAttribute("tabIndex");
    });
*/
    //let clickedItem = event.target;
    //console.log(clickedItem);
    //clickedItem.classList.add("active");

    let showRequestBubble = item.showRequestBubble;
    let showResponseBubble = item.showResponseBubble;

    createRequestBubble(item, showRequestBubble);
    createResponseBubble(item, showResponseBubble);
  };

  // CREATE A BUBBLE SHOWING THE USER REQUEST
  const createRequestBubble = (item, showRequestBubble) => {
    // CREATE BUBBLE
    setTimeout(function () {
      setTimeout(function () {
        showLoader();
        scrollToBottom();
      }, 500);
      if (showRequestBubble) {
        BubbleTemplate("user", "You", item);
      }
      scrollToBottom();
    }, 0);
  };
  // CREATE A BUBBLE SHOWING THE RESPONSE
  const createResponseBubble = (item, showResponseBubble) => {
    // LET THE CHAT THINK
    let thinkingTime = Math.random() * (2000 - 1500) + 1500;
    // CREATE BUBBLE
    setTimeout(function () {
      removeLoader();
      setTimeout(function () {
        if (showResponseBubble) {
          document.querySelector(".user-input-container").innerHTML = "";
          BubbleTemplate("author", "NGHS Virtual Assistant", item);
        }
        scrollToBottom();
      }, 0);
    }, thinkingTime);
  };

  // start BUBBLE TEMPLATE
  const BubbleTemplate = (type, name, item) => {
    let showLinkedItems = item.showLinkedItems;
    // Create NODES
    let bubbleContainer = document.createElement("div");
    let responseBubble = document.createElement("div");
    let responseBubbleMessage = document.createElement("div");
    let responseBubbleMeta = document.createElement("div");
    let responseBubbleAvatar = document.createElement("div");
    let currentTime = getCurrentTime();

    // Set ATTRIBUTES
    bubbleContainer.setAttribute(
      "class",
      "bubble-container " + type + " fade-in"
    );
    responseBubble.setAttribute("class", "response-bubble");
    responseBubbleMessage.setAttribute("class", "response-bubble-message");
    responseBubbleMeta.setAttribute("class", "response-bubble-meta");
    responseBubbleAvatar.setAttribute("class", "response-bubble-avatar");

    // PLACE ELEMENTS INSIDE OF BUBBLE CONTAINER
    if (type === "author") {
      responseBubbleMessage.innerHTML = item.responseDisplayText;

      responseBubble.appendChild(responseBubbleAvatar);

      //start IF USER INPUT IS REQUIRED
      if (item.userInputRequired) {
        getUserInput(item, bubbleContainer, responseBubbleMessage);
      }
      //end IF USER INPUT IS REQUIRED
    } else {
      // CHANGE THE REQUEST BUBBLE TEXT TO SHOW THE USERINPUT VALUE
      if (userInput != "") {
        responseBubbleMessage.innerHTML = userInput;
        if (userSpecialty) {
          responseBubbleMessage.innerHTML = userSpecialty;
        }
        if (userZip) {
          responseBubbleMessage.innerHTML = userZip;
        }
        if (userDistance) {
          responseBubbleMessage.innerHTML = userDistance;
        }
      } else {
        responseBubbleMessage.innerHTML = item.optionDisplayText;
      }
    }

    responseBubbleMeta.innerHTML = name + " at " + currentTime;
    responseBubble.appendChild(responseBubbleMessage);
    bubbleContainer.appendChild(responseBubble);
    bubbleContainer.appendChild(responseBubbleMeta);
    if (type === "author" && item.linkedItems.length) {
      // LINKED ITEMS -- THESE ARE THE BUTTONS UNDERNEATHE THE RESPONSE BUBBLES
      if (showLinkedItems) {
        // CREATE CONTAINER FOR LINKS
        let itemsContainer = document.createElement("div");
        itemsContainer.setAttribute("class", "items-container");
        bubbleContainer.appendChild(itemsContainer);
        // SHOW LINKED ITEMS
        item.linkedItems.map((linkedItem) => {
          let i;
          for (i = 0; i < items.length; i++) {
            if (items[i].id === linkedItem && items[i].isActive) {
              let item = items[i];
              let linkText = item.optionDisplayText;
              let linkItem = document.createElement("div");
              linkItem.setAttribute("class", "item");

              const showLinkedOptions = (item) => {
                const itemsContainer = document.querySelector(
                  ".bubble-container:last-of-type .items-container"
                );
                itemsContainer.classList.add("disabled");
                // START THE WHOLE PROCESS OVER AGAIN
                onOptionClick(item);
              };

              linkItem.onclick = (items) => {
                showLinkedOptions(item);
              };

              linkItem.onkeyup = (event) => {
                if (onKeyUp(event)) {
                  showLinkedOptions(item);
                }
              };

              let chatOption = document.createElement("div");
              chatOption.setAttribute("class", "chatoption");
              chatOption.innerHTML = linkText;
              chatOption.title = linkText;
              chatOption.tabIndex = 1000 + i;
              linkItem.appendChild(chatOption);
              itemsContainer.appendChild(linkItem);
            }
          }
          return false;
        });
      }
    }

    document.querySelector(".response-container").appendChild(bubbleContainer);
  };
  // end BUBBLE TEMPLATE
  //// GET USER INPUT
  const getUserInput = (item, bubbleContainer, responseBubbleMessage) => {
    let thisItem = item;
    let userInputType = item.userInputType;
    let userInputVar = item.userInputVar;
    let userInputPlaceholder = item.userInputPlaceholder;
    let selectArrayVar = item.selectArrayVar;

    // IS THE REQUIRED VARIABLE ACTUALLY A GROUP OF VARIABLES
    if (userInputVar.indexOf(",") > -1) {
      // IF A PROVIDER SPECIALTY HAS BEEN SELECTED
      if (userSpecialty) {
        ///////////////////////
        ///////////////////////
        // CREATE A CONTAINER FOR PROVIDER RESULTS TO GO
        let providersContainer = document.createElement("div");
        providersContainer.setAttribute("class", "providers-container fade-in");

        // GET JSON PROVIDER DATA BASED ON SPECIALTY
        loadJSON(
          "https://www.ngpg.org/dev/chatbot-v2-data/curl-providers-list.php",
          getProviders,
          "jsonp"
        );
        ///////////////////////
        ///////////////////////

        function getProviders(providersData) {
          // console.log(providersData);
          let providerCount = providersData["providers"].length;
          let providerTotal = providersData["total_providers"];
          //console.log("providerTotal from Kyruus: " + providerTotal);
          let showCount = 0;
          let i;

          if (providerCount > 0) {
            for (i = 0; i < providerCount; ++i) {
              let provider = providersData["providers"][i];
              //console.log(provider);
              let providerID = provider["id"];
              let providerType = provider["provider_type"];
              let providerDegree = provider["degrees"];

              if (providerDegree.length > 0) {
                providerDegree = providerDegree[0]["name"];
              } else {
                providerDegree = "";
              }

              ///////// INCLUDE THIS PROVIDER IF THEY'RE A PHYSICIAN
              if (providerType === "Physician") {
                /////////////////// IF WITHIN THE SET MAX RESULTS ////
                if (providerMaxResults > showCount) {
                  // CREATE PROVIDER ITEM
                  let providerItem = document.createElement("div");
                  providerItem.setAttribute("class", "provider-item");

                  let providerFirstName = provider["name"]["first_name"];
                  let providerMiddleName = provider["name"]["middle_name"];
                  let providerLastName = provider["name"]["last_name"];
                  let providerNameSuffix = provider["name"]["suffix"];
                  let providerAlias = provider["preferred_name"];
                  let providerGender = provider["gender"];
                  let providerImageURL = provider["image_url"];
                  let providerLocations = provider["locations"];
                  let providerLocationName = "";
                  let providerLocationAddress = "";
                  let providerLocationStreet1;
                  let providerLocationStreet2;
                  let providerLocationSuite;
                  let providerLocationCity;
                  let providerLocationZip;
                  let providerLocationState;
                  let providerLocationPhone;
                  let providerLocationDistance = 0;
                  let providerAcceptingNewPatients =
                    provider["accepting_new_patients"];
                  let directBook = provider["direct_book_pmc"];
                  let providerShowCTAModal = provider["show_cta_modal"];
                  let actionButtonText = "Get Info";
                  let providerImageURLMale =
                    "https://cdn.kyruus.com/pm-dev/assets/provider-avatar-male-rectangle.png";
                  let providerImageURLFemale =
                    "https://cdn.kyruus.com/pm-dev/assets/provider-avatar-female-rectangle.png";
                  /////////// FORMAT PROVIDER NAME  /////////////////////////////

                  // CHECK FOR MIDDLE NAME
                  if (providerMiddleName == null) {
                    providerMiddleName = "";
                  } else {
                    providerMiddleName = providerMiddleName + "+";
                  }
                  // CHECK FOR SUFFIX
                  if (providerNameSuffix == null) {
                    providerNameSuffix = "";
                  } else {
                    providerNameSuffix = ", " + providerNameSuffix;
                  }
                  let providerFullName =
                    providerFirstName +
                    " " +
                    providerLastName +
                    providerNameSuffix;
                  // CHECK FOR PREFERRED NAME
                  if (providerAlias == null) {
                    providerAlias = "";
                  } else {
                    providerFullName = providerAlias;
                  }
                  /////////////////////////////////////////////////////////////////
                  //////////// GET PROVIDER LOCATION DATA /////////////////////////

                  const getProviderLocation = () => {
                    providerLocationName = providerLocations[0]["name"];
                    providerLocationName = providerLocationName.replaceAll(
                      "Northeast Georgia Physicians Group",
                      "NGPG"
                    );
                    providerLocationStreet1 = providerLocations[0]["street1"];
                    providerLocationStreet2 = providerLocations[0]["street2"];
                    providerLocationSuite = providerLocations[0]["suite"];
                    providerLocationCity = providerLocations[0]["city"];
                    providerLocationZip = providerLocations[0]["zip"];
                    providerLocationState = providerLocations[0]["state"];
                    providerLocationPhone = providerLocations[0]["phone"];

                    //////////////////// BUILD AND FORMAT ADDRESS STRING //////////
                    if (providerLocationStreet1 !== "") {
                      providerLocationAddress =
                        providerLocationAddress + providerLocationStreet1;
                    }
                    if (providerLocationStreet2 !== "") {
                      providerLocationAddress =
                        providerLocationAddress +
                        ", " +
                        providerLocationStreet2;
                    }
                    if (providerLocationSuite !== "") {
                      providerLocationAddress =
                        providerLocationAddress + ", " + providerLocationSuite;
                    }
                    if (providerLocationCity !== "") {
                      providerLocationAddress =
                        providerLocationAddress + ", " + providerLocationCity;
                    }
                    if (providerLocationState !== "") {
                      providerLocationAddress =
                        providerLocationAddress + ", " + providerLocationState;
                    }
                    if (providerLocationZip !== "") {
                      providerLocationAddress =
                        providerLocationAddress + ", " + providerLocationZip;
                    }
                    ///////////////// ROUND LOCATION DISTANCE TO NEAREST TENTGH //////////
                    providerLocationDistance =
                      Math.round(provider["locations"][0]["distance"] * 10) /
                      10;
                  };

                  if (providerLocations.length > 0) {
                    getProviderLocation();
                  } else {
                  }

                  //////// BUILD PROVIDER PROFILE URL
                  let providerProfileURL =
                    directoryURL +
                    "/provider/" +
                    providerFirstName +
                    "+" +
                    providerMiddleName +
                    providerLastName +
                    "/" +
                    providerID +
                    "?ref=chat";
                  //////////////// CUSTOM BUTTON IF PROVIDER CAN BE BOOKED ONLINE
                  if (directBook === "Yes") {
                    /*
                actionButtonText = "Book Appointment";
                providerProfileURL = directoryURL + "/book/" + providerID;
              */
                  }
                  //////////////// SET GENERIC PROVIDER IMAGE URL IF IT DOES NOT ALREADY EXIST
                  if (providerImageURL != null) {
                  } else {
                    if (providerGender === "Male") {
                      providerImageURL = providerImageURLMale;
                    } else {
                      providerImageURL = providerImageURLFemale;
                    }
                  }

                  ////////////////////// BUILD PROVIDER IMAGE HTML ////////
                  let providerImageHTML =
                    "<div class='provider-image'><a href='" +
                    providerProfileURL +
                    "' target='_blank'><img class='ondemand' data-src='" +
                    providerImageURL +
                    "'/></a></div>";
                  ///////////////////////////////////////////////////////////////////////
                  ////////////////////////// BUILD HTML FOR PROVIDER RESULT LISTING ////
                  providerItem.innerHTML += providerImageHTML;
                  providerItem.innerHTML +=
                    "<div class='provider-name'><a href='" +
                    providerProfileURL +
                    "' target='_blank'>" +
                    providerFullName +
                    ", " +
                    providerDegree +
                    "</a></div>";
                  providerItem.innerHTML +=
                    "<div class='practice-group'>" +
                    providerLocationName +
                    "</div>";
                  if (providerAcceptingNewPatients) {
                    providerItem.innerHTML +=
                      "<div class='detail-item provider-message'><span class='material-icons icon'>person_outline</span> Accepting New Patients</div>";
                  }
                  if (providerLocationDistance > 0) {
                    providerItem.innerHTML +=
                      "<div class='detail-item provider-distance'><span class='material-icons icon'>place</span> <strong>" +
                      providerLocationDistance +
                      " miles away</strong> at " +
                      providerLocationAddress +
                      "</div>";
                  }
                  if (providerLocationPhone) {
                    providerItem.innerHTML +=
                      "<div class='detail-item provider-phone'><span class='material-icons icon'>phone</span> <a href='tel:" +
                      providerLocationPhone +
                      "'>" +
                      providerLocationPhone +
                      "</a></div>";
                  }
                  providerItem.innerHTML +=
                    "<div class='action-button'><a href='" +
                    providerProfileURL +
                    "' target='_blank'>" +
                    actionButtonText +
                    "</a></div>";

                  ////// MAKE PROVIDER ITEM TALLER IF SEARCH IS LOCATION BASED
                  if (userZip && userDistance) {
                    providerItem.classList.add("tall");
                  }

                  providersContainer.appendChild(providerItem);
                  showCount = showCount + 1;
                  //console.log("showCount: " + showCount);
                }
              } else {
                // IF PROVIDER WAS NOT IN THE SHOWN SET DUE TO DEGREE, ETC..., REMOVE THEM FROM THE TOTAL
                providerTotal = providerTotal - 1;
                //console.log("providerTotal: " + providerTotal);
              }
            }
            ///////////////////////////////////////////////////////////////////////
            ////////////////// CREATE SEARCH RESULTS MESSAGE BASED ON FOUND RESULTS

            let resultMessageTextA = "a ";
            let resultMessageTextAnother = "an additional ";
            let resultMessageTextResult = "provider";

            if (showCount > 1) {
              resultMessageTextA = "";
              resultMessageTextAnother = "more";
              resultMessageTextResult = "providers";
            }
            responseBubbleMessage.innerHTML =
              "<p>We found " +
              resultMessageTextA +
              resultMessageTextResult +
              " matching your search criteria.</p>";

            //console.log("providerTotal: " + providerTotal);
            //console.log("showCount: " + showCount);
            //console.log("providerMaxResults: " + providerMaxResults);

            ///////////// IF THERE ARE MORE RESULTS THAN THE MAX RESULTS ///
            if (providerTotal >= showCount) {
              let viewAllProvidersURL =
                directoryURL + "/search?&sort=availability_density_best";

              if (userSpecialty) {
                viewAllProvidersURL =
                  viewAllProvidersURL +
                  "&alias_term=" +
                  userSpecialty +
                  "&specialty_synonym=" +
                  userSpecialty +
                  ".*";
              }
              if (userZip) {
                viewAllProvidersURL =
                  viewAllProvidersURL +
                  "&location=" +
                  userZip +
                  "&display_location=" +
                  userZip;
              }
              if (userDistance) {
                viewAllProvidersURL =
                  viewAllProvidersURL + "&distance=" + userDistance;
              }
              // HOW MANY MATCHING PROVIDERS WERE NOT SHOWN IN THE SET?
              providerTotalremaining = providerTotal - showCount;
              // console.log("providerTotalremaining: " + providerTotalremaining);
              // IF THERE ARE MORE RESULTS AVAILABLE, CREATE LINK IN RESULT MESSAGE
              if (providerTotalremaining > 0) {
                ////////// CREATE LINK IN RESULT MESSAGE
                /*
                responseBubbleMessage.innerHTML +=
                  "<p><strong><a href='" +
                  viewAllProvidersURL +
                  "' target='_blank'>Click here</a></strong> to view more results.</p>";
                */

                //////// CREATE ADDITIONAL ITEM AT END OF PROVIDER LIST
                let additionalProviderItem = document.createElement("div");
                additionalProviderItem.setAttribute(
                  "class",
                  "provider-item text-white text-center pt-5 bg-dark mr-0"
                );
                additionalProviderItem.innerHTML +=
                  "<h4>More providers are available</h4>";
                additionalProviderItem.innerHTML +=
                  "<p class='small'>Click the link below to view all matching providers and to customize your search.</p>";
                additionalProviderItem.innerHTML +=
                  "<div class='action-button'><a href='" +
                  viewAllProvidersURL +
                  "' target='_blank'>View all providers</a></div>";

                providersContainer.appendChild(additionalProviderItem);
              }
            }
          } else {
            //////// CUSTOM MESSAGES IF THERE WERE NO RESULTS ////////
            responseBubbleMessage.innerHTML =
              "<p>Hmm... no providers matching your search criteria.</p>";

            if (userZip) {
              responseBubbleMessage.innerHTML =
                "<p>Hmm... no providers matching your search criteria. You could try a different zip code or change your travel distance to broaden your search.</p>";
            }

            responseBubbleMessage.innerHTML +=
              "Please try again or <a href='" +
              directoryURL +
              "/search?sort=availability_density_best' target='_blank'>click here</a> to refine your search.</p>";
          }

          //////////////// ADD PROVIDER RESULT TO THE PROVIDERS CONTAINER /////////
          rootElement.classList.add("tall");
          bubbleContainer.appendChild(providersContainer);
          document
            .querySelectorAll(".ondemand")
            .forEach((element) => lazyload.observe(element));

          scrollToBottom();
        }
      }
    }

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////// USER INPUT FORM /////////////////////////////////

    // CREATE FORM ELEMENTS
    let responseUserInputForm = document.createElement("form");
    let responseUserInputButton = document.createElement("button");

    responseUserInputForm.setAttribute("class", "user-input-form");
    responseUserInputButton.innerHTML = "Submit";

    let userInputContainer = document.querySelector(".user-input-container");

    ////////////////////////////////////////////////////////////
    /////////////// IF TEXT INPUT (Zipcode, etc.)
    if (userInputType === "text" || userInputType === "number") {
      let userInputParams = "";

      if (userInputType === "number") {
        userInputParams = "pattern='[0 - 9] *' inputmode='numeric'";
      }

      responseUserInputForm.innerHTML =
        "<input type='" +
        userInputType +
        "' " +
        userInputParams +
        " placeholder='" +
        userInputPlaceholder +
        "' name='" +
        userInputPlaceholder +
        "' data-type='" +
        userInputVar +
        "'/>";
      // ON USER INPUT SUBMIT CLICK
      responseUserInputButton.onclick = (event, item) => {
        event.preventDefault();

        userInput = document.querySelector("[data-type='" + userInputVar + "']")
          .value;

        if (!userInput) {
          alert("Please use the input box provided.");
        }
        // ASSIGN USER INPUT VALUE TO USER INPUT VARIABLE
        eval(userInputVar + " = " + "'" + userInput + "'");

        //////// ZIPCODE VALIDATION
        if (userInput && userInputVar === "userZip") {
          if (validateZip(userZip)) {
            responseUserInputButton.disabled = true;
            document.querySelector(
              "[data-type='" + userInputVar + "']"
            ).disabled = true;
            showLinkedInput(thisItem);
          } else {
            alert(userZip + " is not a valid zipcode.");
          }
        }
      };
      // BUILD USER INPUT ITEMS
      responseUserInputForm.appendChild(responseUserInputButton);
      // ADD INPUT TO ACTION AREA
      userInputContainer.appendChild(responseUserInputForm);
    }

    //////////////////  CREATE SELECT WITH OPTIONS IN SELECT ARRAY
    const buildSelectOptions = () => {
      let responseUserInputSelect = document.createElement("select");
      let selectArray = eval(selectArrayVar);
      let disabledOption = document.createElement("option");
      disabledOption.selected = "selected";
      disabledOption.disabled = true;
      disabledOption.text = userInputPlaceholder;
      responseUserInputSelect.add(disabledOption);

      selectArray.map((selectValue) => {
        let option = document.createElement("option");
        option.text = selectValue;
        responseUserInputSelect.add(option);
      });
      responseUserInputForm.appendChild(responseUserInputSelect);
      responseUserInputForm.appendChild(responseUserInputButton);
      userInputContainer.appendChild(responseUserInputForm);

      responseUserInputButton.onclick = (event, item) => {
        event.preventDefault();
        userInput =
          responseUserInputSelect.options[responseUserInputSelect.selectedIndex]
            .value;
        if (userInput === userInputPlaceholder) {
          alert("Please choose an option below.");
        } else {
          // ASSIGN USER INPUT VALUE TO USER INPUT VARIABLE
          eval(userInputVar + " = " + "'" + userInput + "'");
          responseUserInputSelect.disabled = true;
          responseUserInputButton.disabled = true;
          showLinkedInput(thisItem);
        }
      };
    };
    ////////////////////////////////////////////////////////////
    /////////////// IF SELECT (Specialties, etc.)
    if (userInputType === "select") {
      // IF SPECIALTY, GET SPECIALTY LIST VIA KYRUUS API
      if (userInputVar === "userSpecialty") {
        // GET JSON DATA
        loadJSON(
          "https://www.ngpg.org/dev/chatbot-v2-data/curl-specialties-list.php",
          getSpecialties,
          "jsonp"
        );
        let specialtyArrayKyruus = [];
        function getSpecialties(specialtiesData) {
          specialtyArrayKyruus.push(specialtiesData["facets"][0]["terms"]);
          let i;
          for (i = 0; i < specialtyArrayKyruus[0].length; ++i) {
            let specialtyName = specialtyArrayKyruus[0][i]["value"];
            specialtyArray.push(specialtyName);
          }
          buildSelectOptions();
        }
      } else {
        buildSelectOptions();
      }
    }

    const showLinkedInput = (thisItem) => {
      let linkedItem = items.find(
        (item) => item.id === thisItem.linkedItems[0]
      );
      onOptionClick(linkedItem);
    };
  };
  // Scroll to Bottom
  const scrollToBottom = () => {
    let lastBubble = document.querySelector(".bubble-container:last-of-type");
    let headerHeight = document.querySelector(".chat-header").offsetHeight;
    let offsetTop = lastBubble.offsetTop - headerHeight;

    document.querySelector(".dialog-container").scroll({
      top: offsetTop,
      behavior: "smooth"
    });
  };
  // Show Loader
  const showLoader = () => {
    let loaderContainer = document.createElement("div");
    loaderContainer.setAttribute(
      "class",
      "bubble-container loader-container fade-in"
    );
    loaderContainer.innerHTML =
      "<div class='lds-ellipsis'><div></div><div></div><div></div><div></div></div>";
    document.querySelector(".response-container").appendChild(loaderContainer);
  };
  // Remove Loader
  const removeLoader = () => {
    document.querySelector(".loader-container").remove();
  };
  // Validate Zip code
  const validateZip = (userZip) => {
    return /^\d{5}(-\d{4})?$/.test(userZip);
  };

  // Get Current Time
  const getCurrentTime = (currentTime) => {
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentMinute = currentDate.getMinutes();
    if (currentMinute < 10) {
      currentMinute = "0" + currentMinute;
    }
    let currentPeriod = "p.m.";
    if (currentHour < 12 || currentHour > 23) {
      currentPeriod = "a.m.";
    } else {
      if (currentHour === 12) {
      } else {
        currentHour = currentHour - 12;
      }
    }
    currentTime = currentHour + ":" + currentMinute + " " + currentPeriod;
    return currentTime;
  };

  // RESTART
  const onRestart = () => {
    userInput = [];
    userSpecialty = "";
    userSpecialtyEncoded = "";
    userDistance = "";
    userZip = "";
    sendData = "";
    providerTotalremaining = 0;
    specialtyArray = [];

    document.querySelector(".response-container").innerHTML = "";
    document.querySelector(".user-input-container").innerHTML = "";
    document.querySelector(".items-container").classList.remove("disabled");
    rootElement.classList.remove("tall");
  };
  // LAZY LOAD PROVIDER IMAGES
  const lazyload = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;
        image.classList.add("fade-in");
        lazyload.unobserve(image);
      }
    })
  );

  //////////////////// GET JSON DATA FROM URL  ////////////////////
  const loadJSON = (path, success, error) => {
    var xhr = new XMLHttpRequest();

    if (userSpecialty) {
      sendData += "specialty=" + userSpecialty;
    }
    if (userZip) {
      sendData += "&zipcode=" + userZip;
    }
    if (userDistance) {
      if (userDistance === "Any distance") {
        userDistance = 1000;
      } else {
        userDistance = userDistance.split(" ");
        userDistance = userDistance[0];
      }

      sendData += "&distance=" + userDistance;
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          success(JSON.parse(xhr.responseText));
        } else {
          error(console.log(xhr));
        }
      }
    };
    xhr.open("POST", path, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(sendData);
  };
  ///////////////////////////////////////////////

  const Header = () => {
    return (
      <div className="chat-header wrapper">
        <div className="chat-header-text">Get Assistance</div>

        <div
          className="chat-resize header-icon"
          onClick={() => ResizeApp()}
          onKeyUp={(event) => onKeyUp(event)}
          title="Resize"
          tabIndex="2001">
          <span className="material-icons">fullscreen</span>
        </div>

        <div
          className="chat-close header-icon"
          onClick={() => ToggleApp()}
          onKeyUp={(event) => onKeyUp(event)}
          title="Close"
          tabIndex="2002">
          <span className="material-icons">close</span>
        </div>
      </div>
    );
  };
  // FOOTER
  const Footer = () => {
    return (
      <div className="chat-footer wrapper">
        <div className="user-input-container"></div>
        <div
          className="action-button action-restart"
          title="Restart"
          tabIndex="2003"
          onClick={() => onRestart()}
          onKeyUp={(event) => onKeyUp(event)}>
          Restart
        </div>
      </div>
    );
  };
  const Welcome = () => {
    return (
      <div className="welcome-container">
        <div className="welcome-text">
          Our Virtual Assistant can help you find a new provider, get location
          information and more. Please choose an option below to get started.
        </div>
      </div>
    );
  };
  const Responses = () => {
    return <div className="response-container" />;
  };

  const ToggleApp = () => {
    setTimeout(function () {
      document.querySelector(".app-launch-button").classList.toggle("inactive");
    }, 0);
    setTimeout(function () {
      document.querySelector(".app").classList.toggle("inactive");
      rootElement.classList.remove("expanded");
      onRestart();
    }, 100);
  };
  const ResizeApp = () => {
    setTimeout(function () {
      document.querySelector("#root").classList.toggle("expanded");
      setTimeout(function () {
        scrollToBottom();
      }, 300);
    }, 100);
  };
  const AppLaunchButton = () => {
    return (
      <div
        className="app-launch-button"
        tabIndex="2000"
        onClick={() => ToggleApp()}
        onKeyUp={(event) => onKeyUp(event)}
        title="Toggle Chat">
        <span className="material-icons">chat_bubble_outline</span>
      </div>
    );
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      event.target.click();
    }
  };
  //////////////////////////// OUTPUT THE APP
  return (
    <>
      <div className="app inactive">
        <Header />
        <div className="chat-container">
          <div className="dialog-container wrapper">
            <Welcome />
            <div className="items-container">
              <Items items={items} />
            </div>

            <Responses />
          </div>
        </div>
        <Footer />
      </div>
      <AppLaunchButton />
    </>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
