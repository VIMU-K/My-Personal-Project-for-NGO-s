/* ============================================
   PART 1: TOGGLE LOGIC (Before/After demo)
   ============================================ */

const toggleButtons = document.querySelectorAll(".toggle-btn");
const demoStage = document.getElementById("demoStage");

// Content for the "Before" (current/problem) state
const beforeContent = `
  <div class="compare-grid">
    <div class="compare-card problem">
      <span class="tag tag-problem">Step 1</span>
      <h3>Staff writes notes on paper</h3>
      <div class="paper-mock" data-tip="Often written during the session, under emotional time pressure">
        <p class="handwritten">Client: J. Smith family<br>Session: Grief counseling<br>Date: ___________<br>Notes: Discussed coping<br>strategies, follow-up<br>needed in 2 weeks...</p>
      </div>
      <p class="card-caption">Notes are handwritten during or right after the session.</p>
    </div>

    <div class="compare-arrow">→</div>

    <div class="compare-card problem">
      <span class="tag tag-problem">Step 2</span>
      <h3>Re-typed into Apricot later</h3>
      <div class="form-mock slow">
        <div class="form-row"><span>Client Name</span><div class="input-box typing" data-tip="Typed from memory or handwriting, risk of typos">~30 sec</div></div>
        <div class="form-row"><span>Session Date</span><div class="input-box typing" data-tip="Manually selected from a calendar picker">~15 sec</div></div>
        <div class="form-row"><span>Notes</span><div class="input-box typing tall" data-tip="Full notes re-typed word for word from paper">~3-4 min</div></div>
        <div class="form-row"><span>Follow-up</span><div class="input-box typing" data-tip="Staff must remember to set this manually">~20 sec</div></div>
      </div>
      <p class="card-caption">Same information typed manually, often hours or days later.</p>
    </div>
  </div>

  <div class="cost-banner problem-banner">
    <strong>Estimated cost:</strong> ~10-15 minutes of duplicate work per client, per session, multiplied across every staff member, every week.
  </div>
`;

// Content for the "After" (optimized/solution) state
const afterContent = `
  <div class="compare-grid single">
    <div class="compare-card solution">
      <span class="tag tag-solution">One Step</span>
      <h3>Entered once, directly into Apricot</h3>
      <div class="form-mock fast">
        <div class="form-row"><span>Client Name</span><div class="input-box filled" data-tip="Pulled from existing client record via autocomplete">J. Smith family</div></div>
        <div class="form-row"><span>Session Date</span><div class="input-box filled autofilled" data-tip="System fills today's date automatically">Auto-filled: Today</div></div>
        <div class="form-row"><span>Notes</span><div class="input-box filled tall" data-tip="Entered once, live, during the session on any device">Discussed coping strategies, follow-up needed in 2 weeks</div></div>
        <div class="form-row"><span>Follow-up</span><div class="input-box filled autofilled" data-tip="Apricot's workflow rules schedule this automatically">Reminder set automatically</div></div>
      </div>
      <p class="card-caption">A shortened, smart-filled form lets staff enter data once, during or right after the session, on any device.</p>
    </div>
  </div>

  <div class="cost-banner solution-banner">
    <strong>Result:</strong> Zero duplicate entry. Staff spend that reclaimed time with families instead of paperwork.
  </div>
`;

function renderDemo(mode) {
  demoStage.innerHTML = mode === "before" ? beforeContent : afterContent;
  demoStage.classList.remove("fade-in");
  requestAnimationFrame(() => demoStage.classList.add("fade-in"));
}

toggleButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    toggleButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
    renderDemo(button.dataset.mode);
  });
});

renderDemo("before");


/* ============================================
   PART 2: DASHBOARD (demo data + charts)
   ============================================ */

const dashboardGrid = document.getElementById("dashboardGrid");

const donorData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  giving: [4200, 3800, 5100, 4700, 6200, 7100],
};

const programData = {
  labels: ["Families Served", "Repeat Sessions", "New Enrollments"],
  values: [128, 86, 42],
};

const dataQuality = {
  after: 94,
};

function renderDashboard() {
  dashboardGrid.innerHTML = `
    <div class="stat-card">
      <p class="stat-label">Families Served (demo data)</p>
      <p class="stat-number">128</p>
      <p class="stat-delta up">+18% vs last quarter</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Avg. Data Entry Time</p>
      <p class="stat-number">4<span class="unit">min</span></p>
      <p class="stat-delta up">−65% after optimization</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Data Quality Score</p>
      <p class="stat-number">94<span class="unit">%</span></p>
      <p class="stat-delta up">+32 points after cleanup</p>
    </div>

    <div class="chart-card wide">
      <h3>Monthly Donor Giving (Demo Data)</h3>
      <canvas id="givingChart" height="110"></canvas>
    </div>

    <div class="chart-card">
      <h3>Program Snapshot (Demo Data)</h3>
      <canvas id="programChart" height="160"></canvas>
    </div>

    <div class="chart-card">
      <h3>Data Quality: Before vs After</h3>
      <canvas id="qualityChart" height="160"></canvas>
    </div>
  `;

  buildGivingChart();
  buildProgramChart();
  buildQualityChart();
}

function buildGivingChart() {
  const ctx = document.getElementById("givingChart");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: donorData.months,
      datasets: [{
        label: "Donations ($)",
        data: donorData.giving,
        borderColor: "#C9A227",
        backgroundColor: "rgba(201,162,39,0.15)",
        borderWidth: 3,
        tension: 0.35,
        fill: true,
        pointBackgroundColor: "#1A3A2A",
        pointRadius: 4,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { ticks: { callback: (v) => "$" + v.toLocaleString() } }
      }
    }
  });
}

function buildProgramChart() {
  const ctx = document.getElementById("programChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: programData.labels,
      datasets: [{
        data: programData.values,
        backgroundColor: ["#1A3A2A", "#3E8E6E", "#C9A227"],
        borderRadius: 6,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

function buildQualityChart() {
  const ctx = document.getElementById("qualityChart");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Clean Records", "Needs Review"],
      datasets: [{
        data: [dataQuality.after, 100 - dataQuality.after],
        backgroundColor: ["#3E8E6E", "#E8E0D0"],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "70%",
      plugins: { legend: { position: "bottom" } }
    }
  });
}

renderDashboard();


/* ============================================
   PART 3: DEMOGRAPHICS / CLIENT INSIGHTS
   (Illustrative demo data only - not real clients)
   Interactive: filter bar + clickable chart segments
   ============================================ */

const demographicsGrid = document.getElementById("demographicsGrid");

// Each filter segment has its OWN full dataset.
// This is what makes clicking a filter actually change every chart.
const segments = {
  all: {
    label: "All Clients",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [34, 21, 58, 15] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [42, 38, 26, 14, 8] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [29, 61, 32, 6] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [48, 33, 27, 19, 11] },
    language: { labels: ["English", "Spanish"], values: [86, 42] },
    total: 128,
  },
  children: {
    label: "Children (0-12)",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [34, 0, 0, 0] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [16, 11, 5, 2, 0] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [3, 19, 10, 2] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [12, 18, 2, 2, 0] },
    language: { labels: ["English", "Spanish"], values: [22, 12] },
    total: 34,
  },
  teens: {
    label: "Teens (13-17)",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [0, 21, 0, 0] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [9, 7, 3, 1, 1] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [2, 12, 6, 1] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [4, 13, 2, 1, 1] },
    language: { labels: ["English", "Spanish"], values: [15, 6] },
    total: 21,
  },
  adults: {
    label: "Adults (18-64)",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [0, 0, 58, 0] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [15, 18, 15, 8, 2] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [20, 25, 11, 2] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [25, 2, 21, 14, 8] },
    language: { labels: ["English", "Spanish"], values: [38, 20] },
    total: 58,
  },
  seniors: {
    label: "Seniors (65+)",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [0, 0, 0, 15] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [2, 2, 3, 3, 5] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [4, 5, 5, 1] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [7, 0, 2, 2, 4] },
    language: { labels: ["English", "Spanish"], values: [11, 4] },
    total: 15,
  },
  spanish: {
    label: "Spanish-Speaking",
    age:      { labels: ["Children (0-12)", "Teens (13-17)", "Adults (18-64)", "Seniors (65+)"], values: [12, 6, 20, 4] },
    income:   { labels: ["Below $25k", "$25k-$50k", "$50k-$75k", "$75k+", "Not disclosed"], values: [22, 13, 5, 1, 1] },
    family:   { labels: ["1-2", "3-4", "5-6", "7+"], values: [5, 24, 11, 2] },
    referral: { labels: ["Hospital/Hospice", "School", "Self-Referral", "Word of Mouth", "Other Nonprofit"], values: [19, 14, 5, 3, 1] },
    language: { labels: ["English", "Spanish"], values: [0, 42] },
    total: 42,
  },
};

let activeSegment = "all";
let charts = {}; // store chart instances so we can destroy/rebuild on filter change

function renderDemographics() {
  demographicsGrid.innerHTML = `
    <div class="filter-bar" id="filterBar">
      <button class="filter-btn active" data-segment="all">All Clients</button>
      <button class="filter-btn" data-segment="children">Children</button>
      <button class="filter-btn" data-segment="teens">Teens</button>
      <button class="filter-btn" data-segment="adults">Adults</button>
      <button class="filter-btn" data-segment="seniors">Seniors</button>
      <button class="filter-btn" data-segment="spanish">Spanish-Speaking</button>
    </div>

    <div class="filter-summary" id="filterSummary"></div>

    <div class="demographics-charts">
      <div class="chart-card half">
        <h3>Age Groups Served <span class="hint">click a slice ↴</span></h3>
        <canvas id="ageChart" height="170"></canvas>
      </div>

      <div class="chart-card half">
        <h3>Household Income Bracket <span class="hint">click a bar ↴</span></h3>
        <canvas id="incomeChart" height="170"></canvas>
      </div>

      <div class="chart-card">
        <h3>Family Size</h3>
        <canvas id="familyChart" height="170"></canvas>
      </div>

      <div class="chart-card wide">
        <h3>Referral Source <span class="hint">click a bar ↴</span></h3>
        <canvas id="referralChart" height="120"></canvas>
      </div>

      <div class="chart-card">
        <h3>Primary Language</h3>
        <canvas id="languageChart" height="170"></canvas>
      </div>

      <div class="chart-card" id="detailCard">
        <h3>Click any chart to inspect</h3>
        <p class="detail-placeholder">Click a slice or bar on any chart above. The exact count and share of clients will appear here.</p>
      </div>
    </div>

    <div class="insight-card">
      <h3>Why This Matters</h3>
      <ul class="insight-list">
        <li>Grant applications often require demographic breakdowns of who is served</li>
        <li>Income data helps demonstrate community need to funders</li>
        <li>Language data confirms bilingual staffing is matched to demand</li>
        <li>Referral data shows which partnerships are driving the most families to your organization</li>
      </ul>
    </div>
  `;

  wireFilterBar();
  updateSummary();
  buildAllCharts();
}

function wireFilterBar() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeSegment = btn.dataset.segment;
      updateSummary();
      buildAllCharts();
      showDetail(`Filtered to: ${segments[activeSegment].label}`, `${segments[activeSegment].total} clients in this view (demo data)`);
    });
  });
}

function updateSummary() {
  const seg = segments[activeSegment];
  document.getElementById("filterSummary").innerHTML = `
    Showing <strong>${seg.total}</strong> clients &mdash; <strong>${seg.label}</strong>
    ${activeSegment !== "all" ? `<button class="clear-filter" id="clearFilter">Clear filter ✕</button>` : ""}
  `;
  const clearBtn = document.getElementById("clearFilter");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      activeSegment = "all";
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      document.querySelector('[data-segment="all"]').classList.add("active");
      updateSummary();
      buildAllCharts();
    });
  }
}

function showDetail(title, body) {
  const card = document.getElementById("detailCard");
  if (!card) return;
  card.innerHTML = `<h3>${title}</h3><p class="detail-placeholder">${body}</p>`;
  card.classList.remove("pulse");
  requestAnimationFrame(() => card.classList.add("pulse"));
}

function destroyChart(key) {
  if (charts[key]) {
    charts[key].destroy();
    delete charts[key];
  }
}

function buildAllCharts() {
  const seg = segments[activeSegment];
  buildAgeChart(seg.age);
  buildIncomeChart(seg.income);
  buildFamilyChart(seg.family);
  buildReferralChart(seg.referral);
  buildLanguageChart(seg.language);
}

function clickDetailHandler(label, value, seg) {
  const pct = ((value / seg.total) * 100).toFixed(0);
  showDetail(label, `${value} of ${seg.total} clients (${pct}%) in the "${seg.label}" view fall into this category.`);
}

function buildAgeChart(data) {
  destroyChart("age");
  const ctx = document.getElementById("ageChart");
  charts.age = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: ["#1A3A2A", "#3E8E6E", "#C9A227", "#A9A18C"],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "60%",
      plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          clickDetailHandler(data.labels[i], data.values[i], segments[activeSegment]);
        }
      },
      onHover: (evt, elements) => { evt.native.target.style.cursor = elements.length ? "pointer" : "default"; }
    }
  });
}

function buildIncomeChart(data) {
  destroyChart("income");
  const ctx = document.getElementById("incomeChart");
  charts.income = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: "#3E8E6E",
        borderRadius: 5,
      }]
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          clickDetailHandler(data.labels[i], data.values[i], segments[activeSegment]);
        }
      },
      onHover: (evt, elements) => { evt.native.target.style.cursor = elements.length ? "pointer" : "default"; }
    }
  });
}

function buildFamilyChart(data) {
  destroyChart("family");
  const ctx = document.getElementById("familyChart");
  charts.family = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: "#C9A227",
        borderRadius: 5,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          clickDetailHandler(`Family size ${data.labels[i]}`, data.values[i], segments[activeSegment]);
        }
      },
      onHover: (evt, elements) => { evt.native.target.style.cursor = elements.length ? "pointer" : "default"; }
    }
  });
}

function buildReferralChart(data) {
  destroyChart("referral");
  const ctx = document.getElementById("referralChart");
  charts.referral = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: "#1A3A2A",
        borderRadius: 5,
      }]
    },
    options: {
      indexAxis: "y",
      plugins: { legend: { display: false } },
      scales: { x: { beginAtZero: true } },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          clickDetailHandler(data.labels[i], data.values[i], segments[activeSegment]);
        }
      },
      onHover: (evt, elements) => { evt.native.target.style.cursor = elements.length ? "pointer" : "default"; }
    }
  });
}

function buildLanguageChart(data) {
  destroyChart("language");
  const ctx = document.getElementById("languageChart");
  charts.language = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: ["#1A3A2A", "#C9A227"],
        borderWidth: 0,
      }]
    },
    options: {
      cutout: "60%",
      plugins: { legend: { position: "bottom" } },
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          clickDetailHandler(data.labels[i], data.values[i], segments[activeSegment]);
        }
      },
      onHover: (evt, elements) => { evt.native.target.style.cursor = elements.length ? "pointer" : "default"; }
    }
  });
}

renderDemographics();
