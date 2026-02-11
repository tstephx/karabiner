import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, window, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),
    // b = "B"rowse
    b: {
      y: open("https://youtube.com"),
      r: open("https://reddit.com"),
      g: open("https://mail.google.com"),
      d: open("https://files.archana.cc/downloads"),
      m: open("https://www.myanonamouse.net"),
      l: open("https://linkedin.com"),
      o: open("https://travel.capitalone.com"),
      s: open("https://www.stremio.com"),
      f: open("https://files.archana.cc/"),
      w: open("https://whatbox.ca/news"),
      t: open("https://www.fool.com"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      g: app("Google Chrome"),
      c: app("Claude"),
      v: app("Visual Studio Code"),
      d: app("Todoist"),
      s: app("Slack"),
      e: app("Microsoft Excel"),
      n: app("CotEditor"),
      t: app("Warp"),
      b: app("Bear"),
      z: app("zoom.us"),
      m: app("VLC"),
      r: app("Rectangle"),
      f: app("Finder"),
      i: app("Safari"),
      p: app("Spotify"),
      a: app("ChatGPT Atlas"),
      w: app("WhatsApp"),
      x: app("calibre"),
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window"
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: window("previous-display"),
      o: window("next-display"),
      k: window("top-half"),
      j: window("bottom-half"),
      h: window("left-half"),
      l: window("right-half"),
      f: window("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: open(
        `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
      ),
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      t: open(`raycast://extensions/raycast/system/toggle-system-appearance`),
      c: open("raycast://extensions/raycast/system/open-camera"),
      // 'v'oice
      v: {
        to: [
          {
            key_code: "spacebar",
            modifiers: ["left_option"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // g = "GitHub" via Raycast
    g: {
      r: open("raycast://extensions/thomaslombart/github/search-repositories"),
      p: open("raycast://extensions/thomaslombart/github/my-pull-requests"),
      i: open("raycast://extensions/thomaslombart/github/my-issues"),
      c: open("raycast://extensions/thomaslombart/github/create-pull-request"),
      n: open("raycast://extensions/thomaslombart/github/create-issue"),
      b: open("raycast://extensions/thomaslombart/github/create-branch"),
      s: open("raycast://extensions/thomaslombart/github/my-starred-repositories"),
      l: open("raycast://extensions/thomaslombart/github/my-latest-repositories"),
    },

    // p = "Projects" - Open VS Code workspace
    p: open("file:///Users/taylorstephens/github/my-projects.code-workspace"),

    // r = "Raycast"
    r: {
      // Built-in Raycast features
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      f: open("raycast://extensions/raycast/file-search/search-files"),
      // Installed extensions  
      n: open("raycast://extensions/tumtum/apple-notes/index"),
      b: open("raycast://extensions/hmarr/bear/index"),
      x: open("raycast://extensions/xeric/currency-exchange/index"),
      w: open("raycast://extensions/tonka3000/weather/index"),
      i: open("raycast://extensions/tonka3000/speedtest/index"),
      m: open("raycast://extensions/hossammourad/raycast-system-monitor/system-monitor"),
      a: open("raycast://extensions/thomaslombart/apple-reminders/create-reminder"),
      k: open("raycast://extensions/rolandleth/kill-process/index"),
      v: open("raycast://extensions/koinzhang/paste-as-plain-text/paste-as-plain-text"),
      1: open("raycast://extensions/khasbilegt/1password/item-list"),
      // Spotify
      p: open("raycast://extensions/mattisssa/spotify-player/nowPlaying"),
      // System controls
      d: open("raycast://extensions/yakitrak/do-not-disturb/toggle"),
      l: open("raycast://extensions/raycast/system/lock-screen"),
      o: open("raycast://extensions/raycast/raycast/store"),
    },
    // Cheatsheet - hold to show in maximized Chrome, release to close
    slash: {
      description: "Show Cheatsheet",
      to: [
        {
          shell_command: `osascript -e 'tell application "Google Chrome" to set newWindow to make new window' -e 'tell application "Google Chrome" to set URL of active tab of newWindow to "file://${process.env.HOME}/github/mxstbr/karabiner/cheatsheet.html"' -e 'tell application "Google Chrome" to set bounds of newWindow to {0, 0, 10000, 10000}' -e 'tell application "Google Chrome" to activate'`,
        },
      ],
      to_after_key_up: [
        {
          shell_command: `osascript -e 'tell application "Google Chrome" to repeat with w in windows' -e 'if URL of active tab of w contains "cheatsheet.html" then close w' -e 'end repeat'`,
        },
      ],
    },
  }),
  {
    description: "Change Backspace to Spacebar when Minecraft is focused",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
        },
        to: [
          {
            key_code: "spacebar",
          },
        ],
        conditions: [
          {
            type: "frontmost_application_if",
            file_paths: [
              "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
            ],
          },
        ],
      },
    ],
  },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
