/** 头像部分 */
type avatars = {
  small: string;
  medium: string;
  large: string;
};

export type npmPkgInfoType = {
  canEditPackage: boolean;
  capsule: {
    name: string;
    description?: string;
    maintainers?: string[];
    'dist-tags': { latest: string; [key: string]: string };
    lastPublish: { maintainer: string; time: string };
    types: { typescript: { bundled: string; [key: string]: string } };
  };
  dependents: {
    dependentsCount: number;
    dependentsTruncated: string[];
  };
  downloads: { downloads: number; label: string }[];
  ghapi: string;
  isStarred: boolean;
  inkingAllowedForPackage: boolean;
  package: string;
  packageLinkingCallToActionHref: null | string;
  packageUrl: string;
  packageVersion: {
    author: {
      name: string;
      avatars: avatars;
    };
    description?: string;
    homepage?: string;
    repository?: string;
    keywords?: string[];
    dependencies?: {
      [key: string]: string;
    };
    devDependencies?: {
      [key: string]: string;
    };
    maintainers?: {
      name: string;
      avatars: avatars;
    }[];
    name: string;
    license?: string;
    version: string;
    versions: string[];
    deprecations?: string[];
    typings?: string;
  };
  packument: {
    author: {
      name: string;
      avatars: avatars;
    };
    description: string;
    homepage: string;
    repository: string;
    disTags: { latest: string; [key: string]: string };
    keywords: string[];
    maintainers?: { name: string; avatars: avatars }[];
    name: string;
    license: string;
    version: string;
    versions: {
      version: string;
      date: { ts: number; rel: string };
      dist: {
        shasum: string;
        tarball: string;
        fileCount: number;
        integrity: string;
        signatures: { keyid: string; sig: string }[];
        unpackedSize: number;
      };
    }[];
    deprecations: [];
  };
  private: boolean;
  isSecurityPlaceholder: boolean;
  provenance: {
    enabled: boolean;
    feedbackUrl: string;
  };
  starAction: string;
  versionsDownloads: { [a: string]: number };
  readme?: { data: string; ref: string };
  undefined: boolean;
  documentContext: {
    'readme.data': 'readme';
    [key: string]: string;
  };
  user: null;
  auditLogEnabled: boolean;
  userEmailVerified: null;
  csrftoken: string;
  notifications: [];
  name?: string;
  version?: string;
};
