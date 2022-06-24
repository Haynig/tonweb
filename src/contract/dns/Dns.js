const {Cell} = require("../../boc");
const {BN, Address} = require("../../utils");
const {
    DNS_CATEGORY_NEXT_RESOLVER,
    DNS_CATEGORY_SITE,
    DNS_CATEGORY_WALLET,
    createSmartContractAddressRecord,
    createAdnlAddressRecord,
    createNextResolverRecord,
    parseNextResolverRecord,
    parseSmartContractAddressRecord,
    dnsResolve
} = require("./DnsUtils");

// ATTENTION: This is BETA, will be changed

// Need to get this address from network Config #4
const rootDnsAddress = 'Ef9xOk_ikGYvhgL0ruRGOrPTiOgm_2XlLiUBgQYMzjdSEgDP';

class Dns {
    /**
     * @param provider  {HttpProvider}
     */
    constructor(provider) {
        this.provider = provider;
    }

    /**
     * @returns {Promise<Address>}
     */
    async getRootDnsAddress() {
        return new Address(rootDnsAddress);
    }

    /**
     * @param domain    {string} e.g "sub.alice.ton"
     * @param category  {string | undefined} category of requested DNS record, null for all categories
     * @param oneStep {boolean | undefined}  non-recursive
     * @returns {Promise<Map<String, Cell | Address | BN> | Cell | null>}
     */
    resolve(domain, category, oneStep) {
        return dnsResolve(this.provider, rootDnsAddress, domain, category, oneStep)
    }
}

Dns.resolve = dnsResolve;
Dns.createSmartContractAddressRecord = createSmartContractAddressRecord;
Dns.createAdnlAddressRecord = createAdnlAddressRecord;
Dns.createNextResolverRecord = createNextResolverRecord;
Dns.parseNextResolverRecord = parseNextResolverRecord;
Dns.parseSmartContractAddressRecord = parseSmartContractAddressRecord;
Dns.DNS_CATEGORY_NEXT_RESOLVER = DNS_CATEGORY_NEXT_RESOLVER;
Dns.DNS_CATEGORY_WALLET = DNS_CATEGORY_WALLET;
Dns.DNS_CATEGORY_SITE = DNS_CATEGORY_SITE;

module.exports.default = Dns;