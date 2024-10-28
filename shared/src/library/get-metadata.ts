
export function getOrganizationName(): string {
    return process.env.NEXT_PUBLIC_ORG_NAME ?? "";
}

export function addOrganizationNameToTitle(title: string): string {
    const orgName = getOrganizationName();
    return title.concat(orgName ? ` | ${orgName}` : "");
}