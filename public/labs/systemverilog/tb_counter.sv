`timescale 1ns/1ps

module tb_counter;
  logic       clk;
  logic       rst_n = 1'b0;
  logic       en = 1'b1;
  logic [3:0] count;

  counter #(.WIDTH(4)) dut (
    .clk(clk),
    .rst_n(rst_n),
    .en(en),
    .count(count)
  );

  initial begin
    clk = 1'b0;
    forever #5 clk = ~clk;
  end

  initial begin
    repeat (2) @(posedge clk);
    @(negedge clk);
    rst_n = 1'b1;

    @(posedge clk); #1;
    if (count !== 4'd1) $fatal(1, "after reset+1 expected 1, got %0d", count);

    en = 1'b0;
    repeat (2) @(posedge clk); #1;
    if (count !== 4'd1) $fatal(1, "enable low should hold count, got %0d", count);

    en = 1'b1;
    @(posedge clk); #1;
    if (count !== 4'd2) $fatal(1, "expected 2, got %0d", count);

    $display("PASS: counter increments and holds correctly");
    $finish;
  end
endmodule
