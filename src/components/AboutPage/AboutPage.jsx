import React, { useEffect } from 'react';
import './AboutPage.css';

function AboutPage() {
  // Scroll to the element when the page is loaded or when the hash in the URL changes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <section className="about-section">
      <h2 className="about-title">About the Creator</h2>
      <div className="about-content">
        <p>
          This website, eduSphere, was created by <strong>Ariel Baron</strong> as part of an ongoing project to make student life more organized and efficient. Also, this project is for the Mamram Hackathon 2025. You can find the source code and contribute to the project by visiting the{' '}
          <a href="https://github.com/ArielBaron/EduSphere" target="_blank" rel="noopener noreferrer">
            eduSphere GitHub repository
          </a>.
        </p>
      </div>

      <h2 className="about-title">How eduSphere Works</h2>

      <div className="about-content">
        <div id="mashov">
          <h3>Mashov Integration</h3>
          <p>
            Our Mashov integration connects directly to the Mashov system, pulling data from grades, behavior reports, and even your timetable. This is powered by my existing{' '}
            <a href="https://github.com/ArielBaron/BetterMashovLive" target="_blank" rel="noopener noreferrer">
              BetterMashovLive GitHub repository
            </a>, which leverages the Mashov API to provide a user-friendly interface for managing and displaying data.
          </p>
          <h4>How It Works:</h4>
          <ul>
            <li>Login using your Mashov credentials (your semel, ID, and password).</li>
            <li>Retrieve grades and behavior reports, allowing you to filter by date, grade, subject, and teacher.</li>
            <li>View your timetable by day and subject.</li>
            <li>Simply run the `Server.js` file using Node.js to get started. Follow the provided instructions in the GitHub repository for a detailed setup guide.</li>
          </ul>
        </div>
        <div id="iscool">
          <h3>Iscool Timetable Integration</h3>
          <p>
            The timetable feature is powered by a custom scraping solution using Puppeteer. We scrape data directly from Mashov's Shahaf platform to provide you with a detailed, up-to-date timetable view.
          </p>
          <h4>How It Works:</h4>
          <ul>
            <li>We use Puppeteer to automate logging into the Shahaf portal.</li>
            <li>Once logged in, we scrape your timetable for each class and subject.</li>
            <li>The timetable is then presented in a clear, user-friendly interface.</li>
            <li>The system also pulls data on any changes to the timetable (e.g., class cancellations or schedule updates), ensuring you're always in the loop.</li>
          </ul>
        </div>
        <div id="insights">
          <h3>Learning Insights</h3>
          <p>
            eduSphere keeps you informed about all important academic events, including vacations, exam schedules, and other essential dates, <br />
             ensuring you never miss a deadline or event!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
