(function () {
  const wizard = document.getElementById("wizard");
  const backdrop = document.getElementById("wizard-backdrop");
  const form = document.getElementById("reading-form");
  const progress = document.getElementById("wizard-progress");
  const progressFill = document.getElementById("wizard-progress-fill");
  const btnNext = document.getElementById("wizard-next");
  const btnBack = document.getElementById("wizard-back");
  const btnClose = document.getElementById("wizard-close");
  const generating = document.getElementById("generating");
  const reportOutput = document.getElementById("report-output");
  const sampleCard = document.getElementById("sample-report-card");
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  const startButtons = [
    "btn-hero-start",
    "btn-header-start",
    "btn-mobile-start",
  ].map((id) => document.getElementById(id));

  let currentStep = 1;
  const totalSteps = 4;

  function openWizard() {
    backdrop.hidden = false;
    if (typeof wizard.showModal === "function") {
      if (!wizard.open) wizard.showModal();
    } else {
      wizard.setAttribute("open", "");
    }
    resetWizard();
    document.body.classList.add("wizard-open");
  }

  function closeWizard() {
    backdrop.hidden = true;
    if (typeof wizard.close === "function" && wizard.open) wizard.close();
    else wizard.removeAttribute("open");
    document.body.classList.remove("wizard-open");
  }

  function resetWizard() {
    currentStep = 1;
    updateStepUI();
    form.reset();
    generating.hidden = true;
    reportOutput.hidden = true;
    reportOutput.innerHTML = "";
    btnNext.textContent = "Continue";
    btnNext.hidden = false;
    btnBack.hidden = true;
  }

  function panels() {
    return [...form.querySelectorAll(".wizard-panel")];
  }

  function updateStepUI() {
    panels().forEach((panel) => {
      const step = Number(panel.dataset.step);
      const active = step === currentStep;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });

    document.querySelectorAll("[data-step-label]").forEach((el) => {
      const step = Number(el.dataset.stepLabel);
      el.classList.toggle("active", step === currentStep);
      el.classList.toggle("done", step < currentStep);
    });

    progress.setAttribute("aria-valuenow", String(currentStep));
    progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;

    btnBack.hidden = currentStep === 1 || currentStep === 4;
    if (currentStep === 3) btnNext.textContent = "Pay $2.00 & generate";
    else if (currentStep === 4) btnNext.hidden = true;
    else {
      btnNext.textContent = "Continue";
      btnNext.hidden = false;
    }
  }

  function validateStep(step) {
    const panel = form.querySelector(`.wizard-panel[data-step="${step}"]`);
    const fields = [...panel.querySelectorAll("input, select")].filter(
      (el) => !el.closest("[hidden]") && el.type !== "radio"
    );
    let valid = true;
    fields.forEach((field) => {
      if (field.required && !field.value.trim()) {
        field.classList.add("invalid");
        valid = false;
      } else {
        field.classList.remove("invalid");
      }
      if (field.type === "number" && field.name === "birthYear") {
        const y = Number(field.value);
        if (!Number.isFinite(y) || y < 1920 || y > 2026) {
          field.classList.add("invalid");
          valid = false;
        }
      }
    });
    return valid;
  }

  function readFormData() {
    const data = Object.fromEntries(new FormData(form));
    return data;
  }

  function runGeneration() {
    generating.hidden = false;
    reportOutput.hidden = true;
    btnNext.disabled = true;
    setTimeout(() => {
      const report = buildReport(readFormData());
      reportOutput.innerHTML = `<article class="report-card report-live">${renderReportHtml(report)}</article>`;
      generating.hidden = true;
      reportOutput.hidden = false;
      btnNext.disabled = false;
    }, 1800);
  }

  const dob = form.elements.dob;
  const birthYear = form.elements.birthYear;
  if (dob && birthYear) {
    dob.addEventListener("change", () => {
      if (dob.value) birthYear.value = dob.value.slice(0, 4);
    });
  }

  btnNext.addEventListener("click", () => {
    if (currentStep < 3) {
      if (!validateStep(currentStep)) return;
      currentStep += 1;
      updateStepUI();
      return;
    }
    if (currentStep === 3) {
      currentStep = 4;
      updateStepUI();
      runGeneration();
    }
  });

  btnBack.addEventListener("click", () => {
    if (currentStep > 1 && currentStep < 4) {
      currentStep -= 1;
      updateStepUI();
    }
  });

  [btnClose, backdrop].forEach((el) =>
    el.addEventListener("click", closeWizard)
  );

  startButtons.forEach((btn) => btn?.addEventListener("click", openWizard));

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  navToggle?.addEventListener("click", () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
  });

  const sample = buildReport(
    {
      fullName: "Sample User",
      birthYear: "1988",
      location: "Kuala Lumpur, Malaysia",
      goal: "wealth",
      doorDirection: "southeast",
      bedroom: "east",
    },
    { sample: true }
  );
  sampleCard.innerHTML = renderReportHtml(sample);

  const luckEl = document.querySelector("[data-demo-luck]");
  if (luckEl) {
  const dayLuck = 70 + (new Date().getDate() % 22);
  luckEl.textContent = dayLuck;
  }
})();