import struct
import zlib


def _chunk(typ: bytes, data: bytes) -> bytes:
    crc = zlib.crc32(typ)
    crc = zlib.crc32(data, crc) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + typ + data + struct.pack(">I", crc)


def write_png_solid(path: str, w: int, h: int, rgba: tuple[int, int, int, int]) -> None:
    r, g, b, a = rgba

    row = bytes([0]) + bytes([r, g, b, a]) * w
    raw = row * h
    comp = zlib.compress(raw, level=9)

    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)

    png = sig + _chunk(b"IHDR", ihdr) + _chunk(b"IDAT", comp) + _chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(png)


def write_ico_with_png(path: str, png_bytes: bytes, size: int = 32) -> None:
    ico_header = struct.pack("<HHH", 0, 1, 1)
    # width/height of 256 are stored as 0; we only use 32.
    entry = struct.pack(
        "<BBBBHHII",
        size,  # width
        size,  # height
        0,  # palette
        0,  # reserved
        1,  # planes
        32,  # bpp
        len(png_bytes),
        6 + 16,  # offset
    )

    with open(path, "wb") as f:
        f.write(ico_header)
        f.write(entry)
        f.write(png_bytes)


def main() -> None:
    brand = (0x00, 0x38, 0x76, 0xFF)

    write_png_solid("assets/img/favicon-32.png", 32, 32, brand)
    write_png_solid("assets/img/apple-touch-icon.png", 180, 180, brand)

    with open("assets/img/favicon-32.png", "rb") as f:
        png = f.read()

    write_ico_with_png("favicon.ico", png, size=32)


if __name__ == "__main__":
    main()
