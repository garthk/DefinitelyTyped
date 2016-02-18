﻿// Type definitions for Chrome packaged application development
// Project: http://developer.chrome.com/apps/
// Definitions by: Adam Lay <https://github.com/AdamLay>, MIZUNE Pine <https://github.com/pine613>, MIZUSHIMA Junki <https://github.com/mzsm>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path='../filesystem/filesystem.d.ts'/>

////////////////////
// App Runtime
////////////////////
declare module chrome.app.runtime {
    interface LaunchData {
        id?: string;
        items?: LaunchDataItem[];
        url?: string;
        referrerUrl?: string;
        isKioskSession?: boolean;
    }

    interface LaunchDataItem {
        entry: FileEntry;
        type: string;
    }

    interface LaunchedEvent {
        addListener(callback: (launchData: LaunchData) => void): void;
    }

    interface RestartedEvent {
        addListener(callback: () => void): void;
    }

    var onLaunched: LaunchedEvent;
    var onRestarted: RestartedEvent;
}

////////////////////
// App Window
////////////////////
declare module chrome.app.window {
    interface ContentBounds {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
    }

    interface BoundsSpecification {
        left?: number;
        top?: number;
        width?: number;
        height?: number;
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
    }

    interface Bounds {
        left: number;
        top: number;
        width: number;
        height: number;
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
        setPosition(left: number, top: number): void;
        setSize(width: number, height: number): void;
        setMinimumSize(minWidth: number, minHeight: number): void;
        setMaximumSize(maxWidth: number, maxHeight: number): void;
    }
    interface FrameOptions {
        type?: string;
        color?: string;
        activeColor?: string;
        inactiveColor?: string;
    }

    interface CreateWindowOptions {
        id?: string;
        innerBounds?: BoundsSpecification;
        outerBounds?: BoundsSpecification;
        minWidth?: number;
        minHeight?: number;
        maxWidth?: number;
        maxHeight?: number;
        frame?: any; // string ("none", "chrome") or FrameOptions
        bounds?: ContentBounds;
        alphaEnabled?: boolean;
        state?: string; // "normal", "fullscreen", "maximized", "minimized"
        hidden?: boolean;
        resizable?: boolean;
        singleton?: boolean;
        alwaysOnTop?: boolean;
        focused?: boolean;
        visibleOnAllWorkspaces?: boolean;
    }

    interface AppWindow {
        focus: () => void;
        fullscreen: () => void;
        isFullscreen: () => boolean;
        minimize: () => void;
        isMinimized: () => boolean;
        maximize: () => void;
        isMaximized: () => boolean;
        restore: () => void;
        moveTo: (left: number, top: number) => void;
        resizeTo: (width: number, height: number) => void;
        drawAttention: () => void;
        clearAttention: () => void;
        close: () => void;
        show: () => void;
        hide: () => void;
        getBounds: () => ContentBounds;
        setBounds: (bounds: ContentBounds) => void;
        isAlwaysOnTop: () => boolean;
        setAlwaysOnTop: (alwaysOnTop: boolean) => void;
        setVisibleOnAllWorkspaces: (alwaysVisible: boolean) => void;
        contentWindow: Window;
        id: string;
        innerBounds: Bounds;
        outerBounds: Bounds;
        onBoundsChanged: WindowEvent;
        onClosed: WindowEvent;
        onFullscreened: WindowEvent;
        onMaximized: WindowEvent;
        onMinimized: WindowEvent;
        onRestored: WindowEvent;
    }

    export function create(url: string, options?: CreateWindowOptions, callback?: (created_window: AppWindow) => void): void;
    export function current(): AppWindow;
    export function get(id: string): AppWindow;
    export function getAll(): AppWindow[];
    export function canSetVisibleOnAllWorkspaces(): boolean;

    interface WindowEvent {
        addListener(callback: () => void): void;
        removeListener(callback: () => void): void;
    }

    var onBoundsChanged: WindowEvent;
    var onClosed: WindowEvent;
    var onFullscreened: WindowEvent;
    var onMaximized: WindowEvent;
    var onMinimized: WindowEvent;
    var onRestored: WindowEvent;
}

////////////////////
// fileSystem
////////////////////
declare module chrome.fileSystem {

    interface ChildChangeInfo {
        entry: Entry;
        type: string;
    }

    interface EntryChangedEvent {
        target: Entry;
        childChanges?: ChildChangeInfo[];
    }

    interface EntryRemovedEvent {
        target: Entry;
    }

    interface AcceptOptions {
        description?: string;
        mimeTypes?: string[];
        extensions?: string[];
    }

    interface ChooseEntryOptions {
        type?: string;
        suggestedName?: string;
        accepts?: AcceptOptions[];
        acceptsAllTypes?: boolean;
        acceptsMultiple?: boolean;
    }

    export function getDisplayPath(entry: Entry, callback: (displayPath: string) => void): void;
    export function getWritableEntry(entry: Entry, callback: (entry: Entry) => void): void;
    export function isWritableEntry(entry: Entry, callback: (isWritable: boolean) => void): void;
    export function chooseEntry(callback: (entry: Entry) => void): void;
    export function chooseEntry(callback: (fileEntries: FileEntry[]) => void): void;
    export function chooseEntry(options: ChooseEntryOptions, callback: (entry: Entry) => void): void;
    export function chooseEntry(options: ChooseEntryOptions, callback: (fileEntries: FileEntry[]) => void): void;
    export function restoreEntry(id: string, callback: (entry: Entry) => void): void;
    export function isRestorable(id: string, callback: (isRestorable: boolean) => void): void;
    export function retainEntry(entry: Entry): string;
}

////////////////////
// Sockets
////////////////////
declare module chrome.sockets.tcp {
    interface CreateInfo {
        socketId: number;
    }

    interface SendInfo {
        resultCode: number;
        bytesSent?: number;
    }

    interface Event<T> {
        addListener(callback: (info: T) => void): void;
    }

    interface ReceiveEventArgs {
        socketId: number;
        data: ArrayBuffer;
    }

    interface ReceiveErrorEventArgs {
        socketId: number;
        resultCode: number;
    }

    interface SocketProperties {
        persistent?: boolean;
        name?: string;
        bufferSize?: number;
    }

    interface SocketInfo {
        socketId: number;
        persistent: boolean;
        name?: string;
        bufferSize?: number;
        paused: boolean;
        connected: boolean;
        localAddress?: string;
        localPort?: number;
        peerAddress?: string;
        peerPort?: number;
    }

    export function create(callback: (createInfo: CreateInfo) => void): void;
    export function create(properties: SocketProperties, callback: (createInfo: CreateInfo) => void): void;

    export function update(socketId: number, properties: SocketProperties, callback?: () => void): void;
    export function setPaused(socketId: number, paused: boolean, callback?: () => void): void;

    export function setKeepAlive(socketId: number,
        enable: boolean, callback: (result: number) => void): void;
    export function setKeepAlive(socketId: number,
        enable: boolean, delay: number, callback: (result: number) => void): void;

    export function setNoDelay(socketId: number, noDelay: boolean, callback: (result: number) => void): void;
    export function connect(socketId: number,
        peerAddress: string, peerPort: number, callback: (result: number) => void): void;
    export function disconnect(socketId: number, callback?: () => void): void;
    export function send(socketId: number, data: ArrayBuffer, callback: (sendInfo: SendInfo) => void): void;
    export function close(socketId: number, callback?: () => void): void;
    export function getInfo(socketId: number, callback: (socketInfo: SocketInfo) => void): void;
    export function getSockets(socketId: number, callback: (socketInfos: SocketInfo[]) => void): void;

    var onReceive: Event<ReceiveEventArgs>;
    var onReceiveError: Event<ReceiveErrorEventArgs>;
}

declare module chrome.sockets.udp {
    interface CreateInfo {
        socketId: number;
    }

    interface SendInfo {
        resultCode: number;
        bytesSent?: number;
    }

    interface Event<T> {
        addListener(callback: (info: T) => void): void;
    }

    interface ReceiveEventArgs {
        socketId: number;
        data: ArrayBuffer;
        remoteAddress: string;
        remotePort: number;
    }

    interface ReceiveErrorEventArgs {
        socketId: number;
        resultCode: number;
    }

    interface SocketProperties {
        persistent?: boolean;
        name?: string;
        bufferSize?: number;
    }

    interface SocketInfo {
        socketId: number;
        persistent: boolean;
        name?: string;
        bufferSize?: number;
        paused: boolean;
        localAddress?: string;
        localPort?: number;
    }

    export function create(callback: (createInfo: CreateInfo) => void): void;
    export function create(properties: SocketProperties,
        callback: (createInfo: CreateInfo) => void): void;

    export function update(socketId: number, properties: SocketProperties, callback?: () => void): void;
    export function setPaused(socketId: number, paused: boolean, callback?: () => void): void;
    export function bind(socketId: number, address: string, port: number, callback: (result: number) => void): void;
    export function send(socketId: number, data: ArrayBuffer, address: string, port: number, callback: (sendInfo: SendInfo) => void): void;
    export function close(socketId: number, callback?: () => void): void;
    export function getInfo(socketId: number, callback: (socketInfo: SocketInfo) => void): void;
    export function getSockets(callback: (socketInfos: SocketInfo[]) => void): void;
    export function joinGroup(socketId: number, address: string, callback: (result: number) => void): void;
    export function leaveGroup(socketId: number, address: string, callback: (result: number) => void): void;
    export function setMulticastTimeToLive(socketId: number, ttl: number, callback: (result: number) => void): void;
    export function setMulticastLoopbackMode(socketId: number, enabled: boolean, callback: (result: number) => void): void;
    export function getJoinedGroups(socketId: number, callback: (groups: string[]) => void): void;

    var onReceive: Event<ReceiveEventArgs>;
    var onReceiveError: Event<ReceiveErrorEventArgs>;
}

declare module chrome.sockets.tcpServer {
    interface CreateInfo {
        socketId: number;
    }

    interface Event<T> {
        addListener(callback: (info: T) => void): void;
    }

    interface AcceptEventArgs {
        socketId: number;
        clientSocketId: number;
    }

    interface AcceptErrorEventArgs {
        socketId: number;
        resultCode: number;
    }

    interface SocketProperties {
        persistent?: boolean;
        name?: string;
    }

    interface SocketInfo {
        socketId: number;
        persistent: boolean;
        name?: string;
        paused: boolean;
        localAddress?: string;
        localPort?: number;
    }

    export function create(callback: (createInfo: CreateInfo) => void): void;
    export function create(properties: SocketProperties, callback: (createInfo: CreateInfo) => void): void;

    export function update(socketId: number, properties: SocketProperties, callback?: () => void): void;
    export function setPaused(socketId: number, paused: boolean, callback?: () => void): void;

    export function listen(socketId: number, address: string,
        port: number, backlog: number, callback: (result: number) => void): void;
    export function listen(socketId: number, address: string,
        port: number, callback: (result: number) => void): void;

    export function disconnect(socketId: number, callback?: () => void): void;
    export function close(socketId: number, callback?: () => void): void;
    export function getInfo(socketId: number, callback: (socketInfos: SocketInfo[]) => void): void;

    var onAccept: Event<AcceptEventArgs>;
    var onAcceptError: Event<AcceptErrorEventArgs>;
}

////////////////////
// System Display
////////////////////
/**
 * Use the system.display API to query display metadata.
 * Permissions: "system.display"
 * @since Chrome 30.
 */
declare module chrome.system.display {
    interface Bounds {
        /**  The x-coordinate of the upper-left corner. */
        left: number;
        /**  The y-coordinate of the upper-left corner. */
        top: number;
        /** The width of the display in pixels. */
        width: number;
        /** The height of the display in pixels. */
        height: number;
    }

    interface Insets {
        /** The x-axis distance from the left bound. */
        left: number;
        /** The y-axis distance from the top bound. */
        top: number;
        /** The x-axis distance from the right bound. */
        right: number;
        /** The y-axis distance from the bottom bound. */
        bottom: number;
    }

    interface DisplayInfo {
        /** The unique identifier of the display. */
        id: string;
        /** The user-friendly name (e.g. "HP LCD monitor"). */
        name: string;
        /** Identifier of the display that is being mirrored on the display unit. If mirroring is not in progress, set to an empty string. Currently exposed only on ChromeOS. Will be empty string on other platforms. */
        mirroringSourceId: string;
        /** True if this is the primary display. */
        isPrimary: boolean;
        /** True if this is an internal display. */
        isInternal: boolean;
        /** True if this display is enabled. */
        isEnabled: boolean;
        /** The number of pixels per inch along the x-axis. */
        dpiX: number;
        /** The number of pixels per inch along the y-axis. */
        dpiY: number;
        /** The display's clockwise rotation in degrees relative to the vertical position. Currently exposed only on ChromeOS. Will be set to 0 on other platforms. */
        rotation: number;
        /** The display's logical bounds. */
        bounds: Bounds;
        /** The display's insets within its screen's bounds. Currently exposed only on ChromeOS. Will be set to empty insets on other platforms. */
        overscan: Insets;
        /** The usable work area of the display within the display bounds. The work area excludes areas of the display reserved for OS, for example taskbar and launcher. */
        workArea: Bounds;
    }

    /** The information about display properties that should be changed. A property will be changed only if a new value for it is specified in |info|. */
    interface DisplayProps {
        /** If set and not empty, starts mirroring between this and the display with the provided id (the system will determine which of the displays is actually mirrored). If set and not empty, stops mirroring between this and the display with the specified id (if mirroring is in progress). If set, no other parameter may be set. */
        mirroringSourceId?: string;
        /** If set to true, makes the display primary. No-op if set to false. */
        isPrimary?: boolean;
        /** If set, sets the display's overscan insets to the provided values. Note that overscan values may not be negative or larger than a half of the screen's size. Overscan cannot be changed on the internal monitor. It's applied after isPrimary parameter. */
        overscan?: Insets;
        /** If set, updates the display's rotation. Legal values are [0, 90, 180, 270]. The rotation is set clockwise, relative to the display's vertical position. It's applied after overscan paramter. */
        rotation?: number;
        /** If set, updates the display's logical bounds origin along x-axis. Applied together with boundsOriginY, if boundsOriginY is set. Note that, when updating the display origin, some constraints will be applied, so the final bounds origin may be different than the one set. The final bounds can be retrieved using getInfo. The bounds origin is applied after rotation. The bounds origin cannot be changed on the primary display. Note that is also invalid to set bounds origin values if isPrimary is also set (as isPrimary parameter is applied first). */
        boundsOriginX?: number;
        /** If set, updates the display's logical bounds origin along y-axis. See documentation for boundsOriginX parameter. */
        boundsOriginY?: number;
    }

    interface DisplayChangedEvent extends chrome.events.Event<() => void> { }

    /** Queries basic CPU information of the system. */
    export function getInfo(callback: (info: DisplayInfo[]) => void): void;

    /** Updates the properties for the display specified by |id|, according to the information provided in |info|. On failure, runtime.lastError will be set. */
    export function setDisplayProperties(id: string, info: DisplayInfo, callback?: () => void): void;

    export var onDisplayChanged: DisplayChangedEvent;
}

////////////////////
// System - Network
////////////////////
declare module chrome.system.network {
    interface NetworkInterface {
        name: string;
        address: string;
        prefixLength: number;
    }

    export function getNetworkInterfaces(callback: (networkInterfaces: NetworkInterface[]) => void): void;
}
