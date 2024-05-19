// Utility function to determine the mobile provider based on the given phone number
function getMobileProvider(phoneNumber) {
    // Extract the first two digits after the country code
    const prefix = phoneNumber.substring(0, 3);

    // Mapping of prefixes to providers
    const providerMap = {
        '024': 'mtn',
        '025': 'mtn',
        '053': 'mtn',
        '054': 'mtn',
        '055': 'mtn',
        '059': 'mtn',
        '027': 'atl',
        '057': 'atl',
        '026': 'atl',
        '056': 'atl',
        '020': 'vod',
        '050': 'vod'
    };

    // Return the provider based on the prefix
    return providerMap[prefix] || 'Unknown';
}

module.exports = {
    getMobileProvider
};
