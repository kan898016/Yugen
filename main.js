document.addEventListener('DOMContentLoaded', () => {
    // IP copy functionality
    const ipBox = document.getElementById('ip-box');
    if (ipBox) {
        ipBox.addEventListener('click', async () => {
            const ip = ipBox.getAttribute('data-clipboard-text');
            try {
                await navigator.clipboard.writeText(ip);
                // Show tooltip
                showTooltip(ipBox, 'IP скопирован! 🦌');
            } catch (err) {
                console.error('Failed to copy IP: ', err);
                showTooltip(ipBox, 'Ошибка копирования');
            }
        });
    }

    // Tooltip function
    function showTooltip(element, message) {
        // Remove any existing tooltip
        const existingTooltip = document.querySelector('.tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = message;
        document.body.appendChild(tooltip);

        // Position tooltip above the element
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + window.scrollX}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10 + window.scrollY}px`;

        // Trigger reflow to enable transition
        tooltip.offsetHeight;
        tooltip.style.opacity = '1';

        // Hide after 1.5 seconds
        setTimeout(() => {
            tooltip.style.opacity = '0';
            // Remove after transition ends
            setTimeout(() => {
                tooltip.remove();
            }, 200);
        }, 1500);
    }

    // Plugin filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pluginCards = document.querySelectorAll('.plugin-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Show/hide plugin cards
            pluginCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Snowflake effect
    const snowflakesContainer = document.querySelector('.snowflakes');
    if (snowflakesContainer) {
        const snowflakeCount = 50; // Number of snowflakes
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '❄'; // Snowflake character
            // Random size
            const size = Math.random() * 0.8 + 0.4; // 0.4 to 1.2 rem
            snowflake.style.fontSize = `${size}rem`;
            // Random horizontal position
            snowflake.style.left = `${Math.random() * 100}%`;
            // Random animation duration and delay
            const duration = Math.random() * 3 + 2; // 2 to 5 seconds
            const delay = Math.random() * 5; // 0 to 5 seconds delay
            snowflake.style.animationDuration = `${duration}s`;
            snowflake.style.animationDelay = `${delay}s`;
            // Random oscillation amplitude (optional)
            snowflake.style.setProperty('--oscillation', Math.random() * 2 - 1);
            snowflakesContainer.appendChild(snowflake);
        }
    }
});