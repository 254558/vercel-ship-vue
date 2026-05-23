// src/assets/hero/sprites/Isometric/index.js
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(
  [
    "object" == typeof document ? document.currentScript : void 0,
    592440,
    (e) => {
      "use strict";
      let t = 4.2 / 18 * 166;
      function r(e, t) {
        return Array.from({ length: t }, (_, r) => `${e}${r + 1}.png`);
      }
      function n(e) {
        return [`${e}_Idle.png`, ...r(`${e}_Walk`, 11), ...r(`${e}_Run`, 6)];
      }
      let a = {
        spawn: {
          folder: "Agent_Spawn",
          frames: Array.from({ length: 21 }, (_, t) => `Isometric_Front_AgentSpawn${t + 1}.png`),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_AgentSpawn.webp",
            frameCount: 21,
          },
        },
        front: {
          folder: "Front",
          frames: n("Isometric_Front"),
          packed: {
            type: "animated-webp",
            src: "front.webp", // 直接指向 second 目录下的文件
            frameCount: 18,
          },
        },
        back: {
          folder: "Back",
          frames: n("Isometric_Back"),
          packed: {
            type: "animated-webp",
            src: "back.webp",
            frameCount: 18,
          },
        },
        left: {
          folder: "Left",
          frames: n("Isometric_Left"),
          packed: {
            type: "animated-webp",
            src: "left.webp",
            frameCount: 18,
          },
        },
        right: {
          folder: "Right",
          frames: n("Isometric_Right"),
          packed: {
            type: "animated-webp",
            src: "right.webp",
            frameCount: 18,
          },
        },
        frontLeft: {
          folder: "Front_Left",
          frames: n("Isometric_FrontLeft"),
          packed: {
            type: "animated-webp",
            src: "frontLeft.webp",
            frameCount: 18,
          },
        },
        frontRight: {
          folder: "Front_Right",
          frames: n("Isometric_FrontRight"),
          packed: {
            type: "animated-webp",
            src: "frontRight.webp",
            frameCount: 18,
          },
        },
        backLeft: {
          folder: "Back_Left",
          frames: n("Isometric_BackLeft"),
          packed: {
            type: "animated-webp",
            src: "backLeft.webp",
            frameCount: 18,
          },
        },
        backRight: {
          folder: "Back_Right",
          frames: n("Isometric_BackRight"),
          packed: {
            type: "animated-webp",
            src: "backRight.webp",
            frameCount: 18,
          },
        },
        resting: {
          folder: "RestingStates",
          frames: [
            "Isometric_Front_Transitionintoaresting1.png",
            "Isometric_Front_Transitionintoaresting2.png",
            "Isometric_Front_Transitionintoaresting3.png",
            "Isometric_Front_Transitionintoaresting4.png",
            "Isometric_Front_Transitionintoaresting5.png",
            "Isometric_Front_Transitionintoaresting_Idle.png",
            "Isometric_Front_wakeup1.png",
            "Isometric_Front_wakeup2.png",
            "Isometric_Front_wakeup3.png",
            "Isometric_Front_wakeup4.png",
            "Isometric_Front_wakeup5.png",
            "Isometric_Front_wakeup6.png",
          ],
          packed: {
            type: "animated-webp",
            src: "resting.webp",
            frameCount: 12,
          },
        },
        dupe: {
          folder: "Duplication",
          frames: Array.from({ length: 17 }, (_, t) => `Duplication${t + 1}.png`),
          packed: {
            type: "animated-webp",
            src: "Duplication.webp",
            frameCount: 17,
          },
        },
        fall: {
          folder: "CursorHand",
          frames: [
            "CursorHand_PinchState_Drop_Fall1.png",
            "CursorHand_PinchState_Drop_Fall2.png",
            "CursorHand_PinchState_Drop_Fall_Idle.png",
            "CursorHand_PinchState_Drop_Fall_touchdown1.png",
            "CursorHand_PinchState_Drop_Fall_touchdown2.png",
            "CursorHand_PinchState_Drop_Fall_touchdown3.png",
            "CursorHand_PinchState_Drop_Fall_touchdown4.png",
            "CursorHand_PinchState_Drop_Fall_touchdown5.png",
            "CursorHand_PinchState_Drop_Fall_touchdown6.png",
            "CursorHand_PinchState_Drop_Fall_touchdown7.png",
            "CursorHand_PinchState_Drop_Fall_touchdown8.png",
            "CursorHand_PinchState_Drop_Fall_touchdown9.png",
            "CursorHand_PinchState_Drop_Fall_touchdown10.png",
            "CursorHand_PinchState_Drop_Fall_touchdown11.png",
          ],
          packed: {
            type: "animated-webp",
            src: "CursorHand_PinchState_Drop_Fall.webp",
            frameCount: 14,
          },
        },
        celebrateFront: {
          folder: "Front",
          frames: r("Isometric_Front_Celebrate", 14),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_Celebrate.webp",
            frameCount: 14,
          },
        },
        celebrateFrontLeft: {
          folder: "Front_Left",
          frames: r("Isometric_FrontLeft_Celebrate", 14),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_Celebrate.webp",
            frameCount: 14,
          },
        },
        celebrateFrontRight: {
          folder: "Front_Right",
          frames: r("Isometric_FrontRight_Celebrate", 14),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_Celebrate.webp",
            frameCount: 14,
          },
        },
        danceFront1: {
          folder: "Dances",
          frames: r("Isometric_Front_TypeDance_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_TypeDance.webp",
            frameCount: 8,
          },
        },
        danceFront2: {
          folder: "Dances",
          frames: r("Isometric_Front_TypeDance2_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_TypeDance2.webp",
            frameCount: 8,
          },
        },
        danceFront3: {
          folder: "Dances",
          frames: r("Isometric_Front_TypeDance3_dance", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_TypeDance3.webp",
            frameCount: 16,
          },
        },
        danceFront4: {
          folder: "Dances",
          frames: r("Isometric_Front_TypeDance4_dance", 6),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_TypeDance4.webp",
            frameCount: 6,
          },
        },
        danceFrontLeft1: {
          folder: "Dances",
          frames: r("Isometric_FrontLeft_TypeDance_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_TypeDance.webp",
            frameCount: 8,
          },
        },
        danceFrontLeft2: {
          folder: "Dances",
          frames: r("Isometric_FrontLeft_TypeDance2_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_TypeDance2.webp",
            frameCount: 8,
          },
        },
        danceFrontLeft3: {
          folder: "Dances",
          frames: r("Isometric_FrontLeft_TypeDance3_dance", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_TypeDance3.webp",
            frameCount: 16,
          },
        },
        danceFrontLeft4: {
          folder: "Dances",
          frames: r("Isometric_FrontLeft_TypeDance4_dance", 6),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_TypeDance4.webp",
            frameCount: 6,
          },
        },
        danceFrontRight1: {
          folder: "Dances",
          frames: r("Isometric_FrontRight_TypeDance_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_TypeDance.webp",
            frameCount: 8,
          },
        },
        danceFrontRight2: {
          folder: "Dances",
          frames: r("Isometric_FrontRight_TypeDance2_dance", 8),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_TypeDance2.webp",
            frameCount: 8,
          },
        },
        danceFrontRight3: {
          folder: "Dances",
          frames: r("Isometric_FrontRight_TypeDance3_dance", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_TypeDance3.webp",
            frameCount: 16,
          },
        },
        danceFrontRight4: {
          folder: "Dances",
          frames: r("Isometric_FrontRight_TypeDance4_dance", 6),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_TypeDance4.webp",
            frameCount: 6,
          },
        },
        ponderingFront: {
          folder: "Front",
          frames: r("Isometric_Front_Thinking", 10),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_Thinking.webp",
            frameCount: 10,
          },
        },
        ponderingFrontLeft: {
          folder: "Front_Left",
          frames: r("Isometric_FrontLeft_Thinking", 10),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_Thinking.webp",
            frameCount: 10,
          },
        },
        ponderingFrontRight: {
          folder: "Front_Right",
          frames: r("Isometric_FrontRight_Thinking", 10),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_Thinking.webp",
            frameCount: 10,
          },
        },
        highFiveFront: {
          folder: "Front",
          frames: r("Isometric_Front_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_HighFive.webp",
            frameCount: 16,
          },
        },
        highFiveBack: {
          folder: "Back",
          frames: r("Isometric_Back_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_Back_HighFive.webp",
            frameCount: 16,
          },
        },
        highFiveFrontLeft: {
          folder: "Front_Left",
          frames: r("Isometric_FrontLeft_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_HighFive.webp",
            frameCount: 16,
          },
        },
        highFiveFrontRight: {
          folder: "Front_Right",
          frames: r("Isometric_FrontRight_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_HighFive.webp",
            frameCount: 16,
          },
        },
        highFiveBackLeft: {
          folder: "Back_Left",
          frames: r("Isometric_BackLeft_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_BackLeft_HighFive.webp",
            frameCount: 16,
          },
        },
        highFiveBackRight: {
          folder: "Back_Right",
          frames: r("Isometric_BackRight_HighFive", 16),
          packed: {
            type: "animated-webp",
            src: "Isometric_BackRight_HighFive.webp",
            frameCount: 16,
          },
        },
        cursorHighFiveJump: {
          folder: "CursorHand",
          frames: r("CursorHand_Front_HighFive", 18),
          packed: {
            type: "animated-webp",
            src: "CursorHand_Front_HighFive.webp",
            frameCount: 18,
          },
          offsetY: -16,
        },
      };

      let o = {
        exprFront: {
          folder: "expressions",
          kind: "static",
          durationMs: [1500, 3500],
          frames: [
            "Expresions_Front1_Normal.png",
            "Expresions_Front2_Confused.png",
            "Expresions_Front3_Thinking.png",
            "Expresions_Front4_Excited.png",
            "Expresions_Front5_Happy.png",
            "Expresions_Front6_Concerned.png",
            "Expresions_Front7_Tired.png",
          ],
          packed: {
            type: "animated-webp",
            src: "Expresions_Front.webp",
            frameCount: 7,
          },
        },
        exprFrontLeft: {
          folder: "expressions",
          kind: "static",
          durationMs: [1500, 3500],
          frames: [
            "Expresions_FrontLeft1_Normal.png",
            "Expresions_FrontLeft2_Confused.png",
            "Expresions_FrontLeft3_Thinking.png",
            "Expresions_FrontLeft4_Excited.png",
            "Expresions_FrontLeft5_Happy.png",
            "Expresions_FrontLeft6_Concerned.png",
            "Expresions_FrontLeft7_Tired.png",
          ],
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontLeft.webp",
            frameCount: 7,
          },
        },
        exprFrontRight: {
          folder: "expressions",
          kind: "static",
          durationMs: [1500, 3500],
          frames: [
            "Expresions_FrontRight1_Normal.png",
            "Expresions_FrontRight2_Confused.png",
            "Expresions_FrontRight3_Thinking.png",
            "Expresions_FrontRight4_Excited.png",
            "Expresions_FrontRight5_Happy.png",
            "Expresions_FrontRight6_Concerned.png",
            "Expresions_FrontRight7_Tired.png",
          ],
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontRight.webp",
            frameCount: 7,
          },
        },
        excitedFront: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_Front_Excited", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_Front_Excited.webp",
            frameCount: 24,
          },
        },
        excitedFrontLeft: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontLeft_Excited", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontLeft_Excited.webp",
            frameCount: 24,
          },
        },
        excitedFrontRight: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontRight_Excited", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontRight_Excited.webp",
            frameCount: 24,
          },
        },
        normalFront: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_Front_Normal", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_Front_Normal.webp",
            frameCount: 24,
          },
        },
        normalFrontLeft: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontLeft_Normal", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontLeft_Normal.webp",
            frameCount: 24,
          },
        },
        normalFrontRight: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontRight_Normal", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontRight_Normal.webp",
            frameCount: 24,
          },
        },
        confusedFront: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_Front_Confused", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_Front_Confused.webp",
            frameCount: 24,
          },
        },
        confusedFrontLeft: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontLeft_Confused", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontLeft_Confused.webp",
            frameCount: 24,
          },
        },
        confusedFrontRight: {
          folder: "expressions",
          kind: "animated",
          fps: 10,
          frames: r("Expresions_FrontRight_Confused", 24),
          packed: {
            type: "animated-webp",
            src: "Expresions_FrontRight_Confused.webp",
            frameCount: 24,
          },
        },
        eyesTriangleFront: {
          folder: "EyesTriangle",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_Front_EyesTriangle", 17),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_EyesTriangle.webp",
            frameCount: 17,
          },
        },
        eyesTriangleFrontLeft: {
          folder: "EyesTriangle",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_FrontLeft_EyesTriangle", 17),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_EyesTriangle.webp",
            frameCount: 17,
          },
        },
        eyesTriangleFrontRight: {
          folder: "EyesTriangle",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_FrontRight_EyesTriangle", 17),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_EyesTriangle.webp",
            frameCount: 17,
          },
        },
        transferingDataFront: {
          folder: "TransferingData",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_Front_Transferingdata", 19),
          packed: {
            type: "animated-webp",
            src: "Isometric_Front_Transferingdata.webp",
            frameCount: 19,
          },
        },
        transferingDataFrontLeft: {
          folder: "TransferingData",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_FrontLeft_Transferingdata", 19),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontLeft_Transferingdata.webp",
            frameCount: 19,
          },
        },
        transferingDataFrontRight: {
          folder: "TransferingData",
          kind: "animated",
          fps: 10,
          frames: r("Isometric_FrontRight_Transferingdata", 19),
          packed: {
            type: "animated-webp",
            src: "Isometric_FrontRight_Transferingdata.webp",
            frameCount: 19,
          },
        },
      };

      let i = ["CursorHand1.png"];
      let s = [
        "CursorHand_PinchState_catch1.png",
        "CursorHand_PinchState_catch2.png",
        "CursorHand_PinchState_catch_Idle.png",
        "CursorHand_PinchState_catch_MoveLeft.png",
        "CursorHand_PinchState_catch_MoveRight.png",
        "CursorHand_PinchState_catch_stopmoving1.png",
        "CursorHand_PinchState_catch_stopmoving2.png",
        "CursorHand_PinchState_catch_stopmoving3.png",
        "CursorHand_PinchState_catch_stopmoving4.png",
        "CursorHand_PinchState_catch_stopmoving5.png",
        "CursorHand_PinchState_Drop_Fall1.png",
        "CursorHand_PinchState_Drop_Fall2.png",
        "CursorHand_PinchState_Drop_Fall_Idle.png",
      ];
      let p = {
        src: "CursorHand.webp",
        frameOrder: [...i, ...s],
      };

      // ✅ 这里是核心修改：指向你的 second 目录
      e.s([
        "AGENT_H", 0, 124,
        "AGENT_W", 0, 166,
        "ANIM_META", 0, a,
        "CURSOR_GRAB_FRAMES", 0, s,
        "CURSOR_HOVER_FRAMES", 0, i,
        "CURSOR_PACK", 0, p,
        "DROP_DIST", 0, 3 / 18 * 166,
        "EXPR_META", 0, o,
        "FRAME_H", 0, 124,
        "FRAME_W", 0, 166,
        "HAND_OFFSET_X", 0, 0.3 / 18 * 166,
        "HAND_OFFSET_Y", 0, 1.747 / 18 * 166,
        "HIT_H", 0, 32.24,
        "HIT_HALF_H", 0, 16.12,
        "HIT_HALF_W", 0, 16.6,
        "HIT_W", 0, 33.2,
        "INITIAL_AGENT_COUNT", 0, 15,
        "MAX_AGENTS", 0, 80,
        "MIN_FBO_H", 0, 120,
        "MIN_FBO_W", 0, 240,
        "SCROLL_PADDING", 0, 0.25,
        "SPRITE_BASE", 0, "/src/assets/second", // 指向你的图片目录
        "SPRITE_EXTENT_ABOVE", 0, t + 62,
        "SPRITE_EXTENT_BELOW", 0, 62 - t,
        "SPRITE_GEO_OFFSET_Y", 0, t,
      ]);
    },
  ],
  [
    583723,
    (e) => {
      "use strict";
      var t = e.i(592440);
      let r = "/src/assets/second"; // 同步修改 Worker 里的 base 路径
      let n = new Map();
      let a = new Map();
      let o = new Map();
      let i = new Map();
      let s = new Map();
      let p = new Map();
      let c = false;
      let _ = (async () => {
        if ("u" < typeof ImageDecoder) return false;
        try {
          return !!(await ImageDecoder.isTypeSupported("image/webp"));
        } catch {
          return false;
        }
      })();

      async function d(e) {
        let t = s.get(e);
        if (t) return t;
        t = (async () => {
          let t = await fetch(e);
          if (!t.ok) throw new Error(`Failed to load sprite pack: ${e} (${t.status})`);
          let r = await t.arrayBuffer();
          if ("u" < typeof ImageDecoder) throw new Error("ImageDecoder unavailable");
          if (!(await ImageDecoder.isTypeSupported("image/webp"))) throw new Error("image/webp not supported by ImageDecoder");
          let n = new ImageDecoder({ data: r, type: "image/webp" });
          try {
            await n.tracks.ready;
            await n.completed;
            let t = n.tracks.selectedTrack;
            if (!t) throw new Error(`No selected track in ${e}`);
            let r = t.frameCount;
            let a = [];
            for (let e = 0; e < r; e++) {
              let { image: t } = await n.decode({ frameIndex: e });
              try {
                a.push(await createImageBitmap(t));
              } finally {
                t.close();
              }
            }
            return a;
          } finally {
            n.close();
          }
        })();
        s.set(e, t);
        t.catch(() => s.delete(e));
        return t;
      }

      async function f(e, n) {
        let s = `${e}/${n}`;
        let f = a.get(s);
        if (f) return f;
        if (!c) {
          c = true;
          [...Object.values(t.ANIM_META), ...Object.values(t.EXPR_META)].forEach((e) => {
            let t = e.packed;
            if (!t) return;
            let n = `${r}/${t.src}`; // 直接指向 second 目录下的 webp 文件
            let a = t.src;
            e.frames.forEach((r, o) => {
              p.set(`${e.folder}/${r}`, {
                packKey: a,
                packUrl: n,
                frameIndex: o,
                expectedFrameCount: t.frameCount,
                siblings: { folder: e.folder, framesArray: e.frames },
              });
            });
          });
        }
        let m = p.get(s);
        if (m && await _) {
          try {
            let e = await d(m.packUrl);
            if (e.length !== m.expectedFrameCount) throw new Error(`Pack frame count mismatch for ${m.packUrl}: got ${e.length}, expected ${m.expectedFrameCount}`);
            let t = e[m.frameIndex];
            if (!t) throw new Error(`Pack frame index ${m.frameIndex} out of range for ${m.packUrl}`);
            for (let [t, r] of m.siblings.framesArray.entries()) {
              let n = `${m.siblings.folder}/${r}`;
              if (!a.has(n) && e[t]) a.set(n, e[t]);
            }
            return t;
          } catch (e) {
            console.warn(`[compositor] packed decode failed for ${s}, falling back to PNG`, e);
          }
        }
        let g = o.get(s);
        if (g) return g;
        g = (async () => {
          let t = `${r}/${e}/${n}`;
          let p = await fetch(t);
          if (!p.ok) throw new Error(`Failed to load sprite: ${t} (${p.status})`);
          let c = await p.blob();
          i.set(s, c.size);
          let _ = await createImageBitmap(c);
          a.set(s, _);
          o.delete(s);
          return _;
        })();
        o.set(s, g);
        return g;
      }

      self.onmessage = async (e) => {
        let t = e.data;
        if (t.type === "ping") {
          return void self.postMessage({
            type: "pong",
            mainNow: t.mainNow,
            workerNow: performance.now(),
          });
        }
        if (t.type === "preload") {
          if (t.batchId) {
            let e = await Promise.allSettled(t.frames.map(({ folder: e, filename: t }) => f(e, t).then(() => `${e}/${t}`)));
            let r = [];
            let n = [];
            for (let t of e) {
              if (t.status === "fulfilled") r.push(t.value);
              else n.push(String(t.reason));
            }
            if (n.length > 0) console.warn("[compositor] Failed to preload frames:", n);
            self.postMessage({
              type: "preloaded",
              batchId: t.batchId,
              succeeded: r,
              failed: n,
            });
            return;
          }
          for (let { folder: e, filename: r } of t.frames) {
            f(e, r).catch(() => {});
          }
          return;
        }
        if (t.type === "composite") {
          try {
            let e = await f(t.bodyFolder, t.bodyFilename);
            let r = n.get(t.agentId);
            if (!r) {
              r = new OffscreenCanvas(166, 124);
              n.set(t.agentId, r);
            }
            let a = r.getContext("2d");
            if (!a) return console.error("2d ctx not ready"), null;
            a.clearRect(0, 0, 166, 124);
            a.drawImage(e, 0, 0);
            if (t.exprFolder && t.exprFilename) {
              let e = await f(t.exprFolder, t.exprFilename);
              a.drawImage(e, 0, 0);
            }
            let o = "transferToImageBitmap" in r ? r.transferToImageBitmap() : await createImageBitmap(r);
            self.postMessage(
              {
                type: "composited",
                agentId: t.agentId,
                seq: t.seq,
                bitmap: o,
              },
              [o]
            );
          } catch (e) {
            console.warn(`[compositor] Failed to composite agent ${t.agentId}:`, e);
          }
        }
      };
      e.s([]);
    },
  ]
);