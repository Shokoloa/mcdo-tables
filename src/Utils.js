import axios from 'axios';
import { UAParser } from 'ua-parser-js';

export const renderMarkdown = (text, maxLength) => {
    if (!text) return '';
    try { text = decodeURIComponent(text); } catch { text = text; }

    if (maxLength && text.length >= maxLength) text = text.slice(0, maxLength) + '...';

    // Remplacer les apostrophes encodés
    text = text.replace(/%apostrophe%/g, '\'');

    // Bold **text**, __text__
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic *text*, _text_
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/_(.*?)_/g, '<em>$1</em>');

    // Links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="markedtext" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Links http/https
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a class="markedtext" href="$1" target="_blank">$1</a>');

    // Headers # text, ## text, ### text
    text = text.replace(/^###\s*(.*)/gm, '<h3>$1</h3>').replace(/^##\s*(.*)/gm, '<h2>$1</h2>').replace(/^#\s*(.*)/gm, '<h1>$1</h1>');

    // Inline code `text`
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Emojis
    text = text.replace(/<a?:(\w+):(\d+)>/g, (match, name, id, offset, str) => {
        const isAnimated = match.startsWith('<a:');
        const imageUrl = `https://cdn.discordapp.com/emojis/${id}.${isAnimated ? 'gif' : 'png'}`;
        return `<img src="${imageUrl}" alt="${name}" class="discord-emoji" style="width: 20px; height: 20px;" />`;
    });

    // Line breaks
    text = text.replace(/\n/g, '<br/>');

    // Safety Links
    text = text.replace(/<a href="(.*?)"/g, '<a href="$1" onclick="return false;" data-url="$1"');

    return text;
};

export const logServerEvent = async (serverId, eventType, endpoint) => {
    try {
        const userDetails = await getUserDetails();
        let eventData;
        if (endpoint === 'server-event') eventData = { guildId: serverId, eventType, userDetails };
        else eventData = { guilds: serverId, eventType, userDetails };

        await axios.post('https://saphira-bump.fr/api/analytics', {
            endpoint: endpoint,
            data: eventData
        }).catch(err => console.error(err));
    } catch (error) { console.error(error) }
};

export const removeEmojis = (str) => { return str.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, ''); };

export const getUserDetails = async () => {
    const userAgent = window.navigator.userAgent || window.opera;
    const parser = new UAParser(userAgent);
    let browser = parser.getBrowser()?.name || null, device = parser.getDevice()?.type || null, os = parser.getOS()?.name || null, language = window.navigator.language || null;
    if (userAgent.includes('OPR/') || userAgent.includes('Opera')) browser = 'Opera';

    return { userAgent, browser, language, device, os };
};

export const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    else if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    else return num.toString();
}

export const shuffleArray = (array) => {
    try {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    } catch { return array; }
};

export const timeAgo = (timestampInSeconds) => {
    const secondsElapsed = Math.floor(Date.now() / 1000) - timestampInSeconds;

    if (secondsElapsed < 60) {
        return `${secondsElapsed}s`;
    } else if (secondsElapsed < 3600) {
        const minutes = Math.floor(secondsElapsed / 60);
        return `${minutes}m`;
    } else if (secondsElapsed < 86400) {
        const hours = Math.floor(secondsElapsed / 3600);
        return `${hours}h`;
    } else {
        const days = Math.floor(secondsElapsed / 86400);
        return `${days}d`;
    }
};

export const brightColor = (color) => {
    color = color.replace(/^#/, '');
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);

    r = Math.min(255, Math.floor(r + (255 - r) * (30 / 100)));
    g = Math.min(255, Math.floor(g + (255 - g) * (30 / 100)));
    b = Math.min(255, Math.floor(b + (255 - b) * (30 / 100)));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const encodeString = (str) => {
    return Array.from(str).map(char => {
        const isEmoji = /\p{Extended_Pictographic}/u.test(char);
        const dangerousChars = /[\0\b\t\n\r\x1a"'\\%_]/.test(char);

        if (isEmoji || dangerousChars) return encodeURIComponent(char);

        return char;
    }).join('');
}

export const decodeString = (str) => {
    return str.replace(/(%[0-9A-F]{2})+/gi, match => {
        try { return decodeURIComponent(match); } catch { return match; }
    });
}