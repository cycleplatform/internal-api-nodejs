/**
 * Denotes size of data, i.e.
 * 10G = 10 Gigabytes
 * 50M = 50 Megabytes etc
 */
export type DataSize = string;

export enum DataSizeUnits {
  KB = "K",
  MB = "M",
  GB = "G",
  TB = "T",
}

/**
 * Denotes a unit of cpu compute time i.e.
 * 1cores
 * 2seconds
 */
export type CPUShares = string;

/**
 * Units avaialble for CPU shares
 */
export enum CPUShareUnits {
  CORES = "cores",
  SECONDS = "seconds",
}

export type Algorithm = "raw" | "sha512" | "md5";

export type ContainerIdentifier = string;

export enum BaseCapabilities {
  CAP_CHOWN = "CAP_CHOWN",
  CAP_FSETID = "CAP_FSETID",
  CAP_DAC_OVERRIDE = "CAP_DAC_OVERRIDE",
  CAP_FOWNER = "CAP_FOWNER",
  CAP_SETFCAP = "CAP_SETFCAP",
  CAP_SETGID = "CAP_SETGID",
  CAP_SETUID = "CAP_SETUID",
  CAP_KILL = "CAP_KILL",
  CAP_MKNOD = "CAP_MKNOD",
  CAP_NET_BIND_SERVICE = "CAP_NET_BIND_SERVICE",
  CAP_AUDIT_WRITE = "CAP_AUDIT_WRITE",
  CAP_SYS_CHROOT = "CAP_SYS_CHROOT",
}

export enum PrivilegedCapabilities {
  CAP_SETPCAP = "CAP_SETPCAP",
  CAP_DAC_READ_SEARCH = "CAP_DAC_READ_SEARCH",
  CAP_NET_ADMIN = "CAP_NET_ADMIN",
  CAP_NET_RAW = "CAP_NET_RAW",
  CAP_SYS_ADMIN = "CAP_SYS_ADMIN",
  CAP_SYS_MODULE = "CAP_SYS_MODULE",
  CAP_SYS_NICE = "CAP_SYS_NICE",
  CAP_SYS_PACCT = "CAP_SYS_PACCT",
  CAP_SYS_PTRACE = "CAP_SYS_PTRACE",
  CAP_SYS_RAWIO = "CAP_SYS_RAWIO",
  CAP_SYS_RESOURCE = "CAP_SYS_RESOURCE",
  CAP_SYSLOG = "CAP_SYSLOG",
  CAP_AUDIT_CONTROL = "CAP_AUDIT_CONTROL",
  CAP_AUDIT_READ = "CAP_AUDIT_READ",
  CAP_IPC_LOCK = "CAP_IPC_LOCK",
  CAP_IPC_OWNER = "CAP_IPC_OWNER",
}

export enum Namespaces {
  IPC = "ipc",
  PID = "pid",
  UTS = "uts",
  NETWORK = "network",
  MOUNT = "mount",
  USER = "user",
}
