// lib/coreLogger.js
export async function logToCore(userId, action, details = '') {
    try {
        await fetch(`${process.env.CORE_URL}/api/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id:   userId,
                action:    action,
                subsystem: 'movie_forum', // ✅ key fix
                details:   details,
            })
        });
    } catch (err) {
        console.error('Failed to log to Core:', err);
    }
}