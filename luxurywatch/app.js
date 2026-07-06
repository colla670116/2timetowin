(() => {
  "use strict";

  const CONFIG = {
    offerUrl: "YOUR_SOI_LINK_HERE",
    campaignDeadline: "",
    socialProof: {
      reviews: []
    }
  };

  const questions = [
    {
      text: "Are you at least 18 years old?",
      help: "This promotion is intended for adults only.",
      answers: [
        { label: "Yes, I am 18 or older", eligible: true },
        { label: "No, I am under 18", eligible: false }
      ]
    },
    {
      text: "Which luxury watch style catches your eye?",
      help: "Choose the look you would be most excited to wear.",
      answers: [
        { label: "Blue dial", eligible: true, style: "blue" },
        { label: "Gold tone", eligible: true, style: "gold" },
        { label: "Classic silver", eligible: true, style: "silver" }
      ]
    },
    {
      text: "If you won, what would you do with it?",
      help: "One final pick before continuing to the sweepstakes.",
      answers: [
        { label: "Wear it myself", eligible: true },
        { label: "Give it as a gift", eligible: true }
      ]
    }
  ];

  const legalContent = {
    terms: {
      title: "Terms & Conditions",
      html: `<h3>Promotional eligibility</h3><p>This page provides a preliminary eligibility check only. Completing the questions does not guarantee a reward, prize, or selection.</p><h3>Partner requirements</h3><p>Final eligibility, availability, geographic restrictions, age requirements, and any additional conditions are determined by the promotional partner on the destination page.</p><h3>Use of this website</h3><p>You must be at least 18 years old and legally able to participate in promotions in your jurisdiction. Do not use this website where prohibited.</p><h3>Updates</h3><p>Replace this template with terms reviewed for your specific promotion, traffic source, and operating jurisdiction before publication.</p>`
    },
    privacy: {
      title: "Privacy Policy",
      html: `<h3>Information on this page</h3><p>The answers selected on this page are used only to advance the on-page experience and are not stored by this static website.</p><h3>Technical information</h3><p>Your hosting provider may process standard request data such as IP address, browser type, and access time. Review your hosting provider’s policy for details.</p><h3>External partner</h3><p>After you continue, the destination website applies its own privacy policy. Review that policy before submitting personal information.</p><h3>Analytics</h3><p>If you add analytics or advertising pixels, disclose them here and provide any notices or consent controls required in your target regions.</p>`
    },
    disclaimer: {
      title: "Non-Affiliation Disclaimer",
      html: `<h3>Independent promotion</h3><p>This website is an independent promotional eligibility portal. It is not sponsored, endorsed, administered by, or associated with any watch manufacturer, retailer, or social media platform unless expressly stated.</p><h3>Trademarks</h3><p>All trademarks, product names, logos, and imagery are the property of their respective owners. Their use does not imply affiliation or endorsement.</p><h3>Reward representation</h3><p>Images are illustrative. The exact reward, model, color, specifications, and availability may vary according to the promotional partner’s terms.</p>`
    }
  };

  const watchImages = {
    blue: "assets/watch-blue.jpg",
    gold: "assets/watch-gold.jpg",
    silver: "assets/watch-silver.jpg"
  };

  const elements = {
    questionCount: document.querySelector("#question-count"),
    questionView: document.querySelector("#question-view"),
    questionLabel: document.querySelector("#question-label"),
    questionText: document.querySelector("#question-text"),
    questionHelp: document.querySelector("#question-help"),
    answerGrid: document.querySelector("#answer-grid"),
    quizPanel: document.querySelector("#quiz-panel"),
    verificationPanel: document.querySelector("#verification-panel"),
    verificationTitle: document.querySelector("#verification-title"),
    verificationStatus: document.querySelector("#verification-status"),
    loadingBar: document.querySelector("#loading-bar"),
    resultPanel: document.querySelector("#result-panel"),
    resultPrize: document.querySelector("#result-prize"),
    resultWatchImage: document.querySelector("#result-watch-image"),
    resultTitle: document.querySelector("#result-title"),
    resultCopy: document.querySelector("#result-copy"),
    resultPoints: document.querySelector("#result-points"),
    resultMicrocopy: document.querySelector("#result-microcopy"),
    selectedWatchName: document.querySelector("#selected-watch-name"),
    countdownPanel: document.querySelector("#countdown-panel"),
    countdownHours: document.querySelector("#countdown-hours"),
    countdownMinutes: document.querySelector("#countdown-minutes"),
    countdownSeconds: document.querySelector("#countdown-seconds"),
    continueButton: document.querySelector("#continue-button"),
    configWarning: document.querySelector("#config-warning"),
    socialProof: document.querySelector("#social-proof"),
    reviewGrid: document.querySelector("#review-grid"),
    legalDialog: document.querySelector("#legal-dialog"),
    legalTitle: document.querySelector("#legal-title"),
    legalBody: document.querySelector("#legal-body"),
    legalClose: document.querySelector("#legal-close")
  };

  let currentQuestion = 0;
  let isEligible = true;
  let selectedWatch = "Luxury watch";
  let selectedWatchStyle = "blue";

  const setProgress = (activeStep) => {
    document.querySelectorAll("[data-progress-step]").forEach((step) => {
      const stepNumber = Number(step.dataset.progressStep);
      step.classList.toggle("is-active", stepNumber === activeStep);
      step.classList.toggle("is-complete", stepNumber < activeStep);
      if (stepNumber === activeStep) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    elements.questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    elements.questionLabel.textContent = `Question ${currentQuestion + 1}`;
    elements.questionText.textContent = question.text;
    elements.questionHelp.textContent = question.help;
    setProgress(currentQuestion + 1);
    elements.answerGrid.replaceChildren();

    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      const label = document.createElement("span");
      label.textContent = answer.label;
      if (answer.style) {
        const thumbnail = document.createElement("span");
        thumbnail.className = `watch-thumb ${answer.style}`;
        thumbnail.setAttribute("aria-hidden", "true");
        button.classList.add("has-watch-thumb");
        button.dataset.watchStyle = answer.label;
        button.dataset.watchClass = answer.style;
        button.append(thumbnail, label);
      } else {
        button.append(label);
      }
      button.dataset.eligible = String(answer.eligible);
      button.addEventListener("click", handleAnswer);
      elements.answerGrid.append(button);
    });
  };

  const handleAnswer = (event) => {
    if (event.currentTarget.dataset.eligible === "false") isEligible = false;
    if (event.currentTarget.dataset.watchStyle) selectedWatch = event.currentTarget.dataset.watchStyle;
    if (event.currentTarget.dataset.watchClass) selectedWatchStyle = event.currentTarget.dataset.watchClass;
    elements.answerGrid.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });

    if (currentQuestion < questions.length - 1) {
      elements.questionView.classList.add("is-changing");
      window.setTimeout(() => {
        currentQuestion += 1;
        renderQuestion();
        elements.questionView.classList.remove("is-changing");
      }, 170);
      return;
    }

    startVerification();
  };

  const startVerification = () => {
    elements.quizPanel.hidden = true;
    elements.verificationPanel.hidden = false;
    document.querySelectorAll("[data-progress-step]").forEach((step) => {
      step.classList.remove("is-active");
      step.classList.add("is-complete");
      step.removeAttribute("aria-current");
    });

    const stages = [
      { delay: 100, width: "32%", status: "Checking basic eligibility", check: 1 },
      { delay: 850, width: "67%", status: "Reviewing your watch preference", check: 2 },
      { delay: 1600, width: "100%", status: "Preparing the sweepstakes entry page", check: 3 }
    ];

    stages.forEach((stage) => {
      window.setTimeout(() => {
        elements.loadingBar.style.width = stage.width;
        elements.verificationStatus.textContent = stage.status;
        document.querySelector(`[data-check="${stage.check}"]`).classList.add("is-checked");
      }, stage.delay);
    });

    window.setTimeout(showResult, 2400);
  };

  const showResult = () => {
    elements.verificationPanel.hidden = true;
    elements.resultPanel.hidden = false;
    document.querySelectorAll("[data-progress-step]").forEach((step) => step.classList.add("is-complete"));
    elements.selectedWatchName.textContent = selectedWatch;
    elements.resultWatchImage.src = watchImages[selectedWatchStyle];
    elements.resultWatchImage.alt = `Selected ${selectedWatch.toLowerCase()} luxury watch`;
    elements.resultCopy.textContent = `Your ${selectedWatch.toLowerCase()} preference is set. Keep going to complete the remaining sweepstakes entry steps for your chance to win.`;

    if (!isEligible) {
      elements.resultPrize.hidden = true;
      elements.resultTitle.textContent = "This promotion is limited to adults";
      elements.resultCopy.textContent = "You must be at least 18 years old to continue with this sweepstakes entry.";
      elements.resultPoints.hidden = true;
      elements.continueButton.hidden = true;
      elements.resultMicrocopy.textContent = "Please review the official terms for eligibility details.";
    }
  };

  const hasValidOfferUrl = () => {
    if (!CONFIG.offerUrl || CONFIG.offerUrl === "YOUR_SOI_LINK_HERE") return false;
    try {
      const url = new URL(CONFIG.offerUrl, window.location.href);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  };

  const buildOfferUrl = () => {
    const destination = new URL(CONFIG.offerUrl, window.location.href);
    const incoming = new URLSearchParams(window.location.search);
    incoming.forEach((value, key) => {
      if (!destination.searchParams.has(key)) destination.searchParams.set(key, value);
    });
    return destination.toString();
  };

  const renderSocialProof = () => {
    const reviews = CONFIG.socialProof.reviews;
    if (!Array.isArray(reviews) || reviews.length === 0) return;

    reviews.slice(0, 3).forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";

      const quote = document.createElement("blockquote");
      quote.textContent = `“${review.quote}”`;

      const author = document.createElement("div");
      author.className = "review-author";
      const initial = document.createElement("span");
      initial.className = "review-avatar";
      initial.textContent = review.name.trim().charAt(0).toUpperCase();
      const details = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = review.name;
      const source = document.createElement("span");
      source.textContent = review.source;
      details.append(name, source);
      author.append(initial, details);
      card.append(quote, author);
      elements.reviewGrid.append(card);
    });

    elements.socialProof.hidden = false;
  };

  const startCountdown = () => {
    if (!CONFIG.campaignDeadline) return;
    const deadline = new Date(CONFIG.campaignDeadline).getTime();
    if (!Number.isFinite(deadline) || deadline <= Date.now()) return;

    elements.countdownPanel.hidden = false;
    let countdownTimer;
    const updateCountdown = () => {
      const remaining = Math.max(0, deadline - Date.now());
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      elements.countdownHours.textContent = String(hours).padStart(2, "0");
      elements.countdownMinutes.textContent = String(minutes).padStart(2, "0");
      elements.countdownSeconds.textContent = String(seconds).padStart(2, "0");
      if (remaining === 0) {
        window.clearInterval(countdownTimer);
        elements.countdownPanel.hidden = true;
      }
    };

    updateCountdown();
    countdownTimer = window.setInterval(updateCountdown, 1000);
  };

  const openLegal = (key) => {
    const content = legalContent[key];
    if (!content) return;
    elements.legalTitle.textContent = content.title;
    elements.legalBody.innerHTML = content.html;
    elements.legalDialog.showModal();
  };

  elements.continueButton.addEventListener("click", () => {
    if (!hasValidOfferUrl()) {
      elements.configWarning.hidden = false;
      return;
    }
    elements.continueButton.disabled = true;
    elements.continueButton.firstChild.textContent = "Opening sweepstakes ";
    window.location.assign(buildOfferUrl());
  });

  document.querySelectorAll("[data-legal]").forEach((button) => {
    button.addEventListener("click", () => openLegal(button.dataset.legal));
  });

  elements.legalClose.addEventListener("click", () => elements.legalDialog.close());
  elements.legalDialog.addEventListener("click", (event) => {
    if (event.target === elements.legalDialog) elements.legalDialog.close();
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();
  renderQuestion();
  renderSocialProof();
  startCountdown();
})();
