function createBlueskyButton() {
    console.log('Bluesky button script running');
    
    // Try different possible selectors for the social container
    const twitterButton = document.querySelector('iframe[title="X Post Button"]');
    console.log('Found Twitter button:', !!twitterButton);
    
    if (!twitterButton) return;
    
    const socialContainer = twitterButton.parentElement;
    console.log('Found social container:', !!socialContainer);
    
    if (!socialContainer) return;
  
    // Create the Bluesky button
    const blueskyBtn = document.createElement('a');
    blueskyBtn.className = 'bluesky-share-btn';
    
    // Add butterfly emoji and text
    blueskyBtn.innerHTML = '🦋 Bsky';
    
    // Get paper title and URL
    const title = document.querySelector('meta[name="citation_title"]')?.content 
      || document.querySelector('h1.highwire-cite-title')?.textContent 
      || '';
    console.log('Found title:', title);
    
    const url = window.location.href;
    
    // Create share text (respecting 300 character limit)
    const shareText = `${title}\n${url}`.slice(0, 300);
    
    // Set up share link
    blueskyBtn.href = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText)}`;
    blueskyBtn.target = '_blank';
    blueskyBtn.rel = 'noopener noreferrer';
  
    // Insert the button
    socialContainer.appendChild(blueskyBtn);
    console.log('Button added to page');
  }
  
  // The Twitter button might load after our script, so let's try a few times
  function tryCreateButton() {
    createBlueskyButton();
    // Try again in 1 second if we didn't find the Twitter button
    if (!document.querySelector('iframe[title="X Post Button"]')) {
      setTimeout(tryCreateButton, 1000);
    }
  }
  
  // Run when page loads
  tryCreateButton();
  
  // Also run when the URL changes (for single-page app navigation)
  let lastUrl = location.href; 
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      tryCreateButton();
    }
  }).observe(document, {subtree: true, childList: true});